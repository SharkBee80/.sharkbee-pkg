## venv

```sh
python3 -m venv .venv
source .venv/bin/activate
```

## upgrade pip

```sh
python3 -m pip install --upgrade pip
```

## deactivate

```sh
deactivate
```

## pip

### install

```sh
pip install -r requirements.txt
# pip uninstall -r requirements.txt
```

### list

```sh
pip freeze > requirements.txt
pip list
```

### upgrade

```sh
pip install --upgrade -r requirements.txt
```

## 打包可执行程序

```sh
pip install pyinstaller
```

```sh
pyinstaller --onefile main.py
```

## pyz

打包为 Python 官方的标准单文件格式（.pyz）：使用内置的 zipapp 模块将包含 **main**.py 的文件夹打包成一个可执行的 .pyz 文件：

```sh
python -m zipapp my_project_folder -o my_app.pyz
```

## 合并为单个 .py 源码文件

```sh
pip install stickytape
```

```sh
stickytape main.py --output-file single_script.py
```
