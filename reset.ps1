Add-Type -AssemblyName System.Windows.Forms
$ErrorActionPreference = 'Stop'

[string] $desktopPath = [Environment]::GetFolderPath('Desktop')
[string] $randomString = Get-Date -Format "yyyy-MM-dd-HH-mm-ss-ff"
[string] $tmpDirPath = "$desktopPath/tmp-$randomString"
[string] $newReactAppPath = "$tmpDirPath/my-app"
Write-Host Y | npx create-react-app "$tmpDirPath/my-app" --template redux-typescript

# 誤削除が怖いので移動にする
function removeIfExists ([string[]] $fileList) {
    $fileList.Where{
        Test-Path $_
    }.ForEach{
        Move-Item $_ $tmpDirPath
    }
}

# -split 前後の空白は削除、文字列中の空白で分割される
[string[]] $REMOVE_FILE_LIST = -split @'
    node_modules
    public
    src
    package-lock.json
    package.json
    tsconfig.json
'@
removeIfExists $REMOVE_FILE_LIST

# .gitignore を削除すると node_modules 内が捜索されるので上書きする
[string[]] $UPDATE_FILE_LIST = $REMOVE_FILE_LIST + '.gitignore'
$UPDATE_FILE_LIST.ForEach{
    "$newReactAppPath/$_"
}.Where{
    Test-Path $_
}.ForEach{
    Move-Item -Force $_ .
}

npm install ( -split @'
    redux-persist
    @types/redux-persist
    react-router
    @types/react-router
    react-router-dom
    @types/react-router-dom
    @mui/material
    @emotion/react
    @emotion/styled
    @mui/icons-material
    @types/uuid
    bignumber.js
'@)

npm install --save-dev ( -split @'
    eslint
    prettier
'@)

# package.jsonの4行目に'  "homepage": ".",'を追加
[string[]] $packageJson = Get-Content package.json
$packageJson[3] += "`n" + '  "homepage": ".",'
$packageJson[-1] += "`n" # -NoNewlineで最後の行を含む改行が消える
$packageJson -join "`n" | Set-Content -NoNewline package.json

removeIfExists '.eslintrc.json'
npx eslint --init

trap {
    [void] [System.Windows.Forms.MessageBox]::Show($_)
}
