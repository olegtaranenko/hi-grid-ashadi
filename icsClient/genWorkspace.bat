@echo off
SETLOCAL

echo Set the directories
SET CURRENT_DIR=%cd%

::SET SENCHADIR=%CURRENT_DIR%\..\devTools\bin\SenchaCmd-6-windows-x86\Sencha\Cmd

::echo unzip ruby
::SET ZIPPER="%CURRENT_DIR%\..\devTools\bin\7zip-windows-x86\7za.exe"
::%ZIPPER% x -aoa -o"%RUBYDIR%\ruby-2.0.0-windows-x86" "%RUBYDIR%\ruby-2.0.0-windows-x86.zip"

echo set the environment
::SET PATH=%RUBYDIR%\ruby-2.0.0-windows-x86\bin;%SENCHADIR%;%PATH%

IF EXIST %CURRENT_DIR%\packages (
    echo removing packages folder
    rmdir %CURRENT_DIR%\packages
)

mkdir %CURRENT_DIR%\packages

if exist .sencha/NUL (
	echo removing directory .sencha
	rmdir /S /Q .sencha
)

sencha -sdk ../ExtJS/src generate workspace .

if not exist ext\NUL echo WARNING: directory ext is missing

if not exist ext\packages\NUL echo WARNING: directory ext\packages is missing

rmdir %CURRENT_DIR%\packages
rmdir %CURRENT_DIR%\src

echo linking packages
mklink /J %CURRENT_DIR%\packages %CURRENT_DIR%\ext\packages
echo linking sources
mklink /J %CURRENT_DIR%\src %CURRENT_DIR%\ext\src

echo done
