2026/09/22

# 目標

Windows11 の環境でWSLインストールして、Ubuntu22 の環境を構築する。
その上で、docker + llama.cpp + qwen3.5-0.8Bを動けるようにしたい。

# WSLのインストール

OS環境：Windows11 Home 25H2

- wsl がインストールされたかどうかを確認

```shell
C:\Users\xxxxxx>wsl --version

未安装适用于 Linux 的 Windows 子系统。可通过运行 “wsl.exe --install” 进行安装。
有关详细信息，请访问 https://aka.ms/wslinstall
按任意键安装适用于 Linux 的 Windows 子系统。按 ESC 或 CTRL-C 取消。此提示将在 60 秒后超时。
已中止操作

```


- github につながれない環境では、下記のコマンドで実行失敗
```
wsl --install --no-distribution --web-download
```

- 代わりに、下記の方法で Microsoft から直接インストールする
- 管理者権限で下記コマンドを実行しする。
- 実行したら、Windows を再起動

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

wsl --install --no-distribution
```

