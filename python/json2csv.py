import os
import json
import requests
import pandas as pd
from datetime import datetime

filePath = ""


# 劫持input
def Xinput(__prompt: object = ""):
    if CONFIG["Xinput"]:
        print(__prompt)
        return None
    return input(__prompt)


# json
def getJson():
    global filePath
    # 选择json来源 1.本地 2.网络
    choice = Xinput(f"选择json来源 1.本地 2.网络 (默认:{CONFIG['defaultJsonSrc']}): ") or CONFIG["defaultJsonSrc"]
    if choice == "1":
        # 选择json文件
        filePath = json_file = Xinput(f"请输入json文件路径 （默认:{CONFIG['filePath']}): ") or CONFIG["filePath"]
        # 判断文件是否存在
        if not os.path.exists(json_file):
            print("文件不存在")
            raise ValueError("文件不存在")
        # 读取 JSON
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)

    elif choice == "2":
        # 选择json链接
        filePath = json_url = Xinput(f"请输入json文件链接: {CONFIG['urlPath']}") or CONFIG["urlPath"]
        # 获取数据
        data = requests.get(json_url)
        if not data.status_code == 200:
            print("链接错误")
            raise ValueError("链接错误")
        data = data.json()

    else:
        print("输入错误")
        raise ValueError("输入错误")
    # print(data)
    if not data:
        print("数据为空")
        raise ValueError("数据为空")
    return data


# 字段
def iField(data):
    choice = Xinput(f"选择字段 1.有字段 2.无字段 3.多字段 (默认:{CONFIG['defaultIField']}): ") or CONFIG[
        "defaultIField"]
    if choice == "1":
        fields = input("请输入字段 （如: abc): ")
        if fields == "":
            print("字段不能为空")
            return data
        field = data.get(fields, data)
        return field

    elif choice == "2":
        field = data
        return field

    elif choice == "3":
        fields = input("请输入字段 (多个字段用空格分隔，如: abc fgh jkl): ")
        if fields == "":
            print("字段不能为空")
            return data
        fields = [i.strip() for i in fields.split(" ") if i.strip()]
        field = data
        try:
            for key in fields:
                if not isinstance(field, dict):
                    field = field[0]
                field = field.get(key, field)
        except Exception as e:
            print(e)
            raise ValueError("字段错误", e)
        return field
    else:
        print("输入错误")
        raise ValueError("输入错误")


# 数据筛选
def Filter(data):
    choice = Xinput(f"选择数据筛选 1.有筛选 2.无筛选 (默认:{CONFIG['defaultFilter']}): ") or CONFIG["defaultFilter"]
    if choice == "1":
        # 获取所有唯一键
        all_keys = set()
        for item in data:
            if isinstance(item, dict):
                all_keys.update(item.keys())

        if not all_keys:
            print("未找到可用的键进行筛选")
            return data

        # 列出所有键并编号
        keys_list = list(all_keys)
        keys_list.sort()
        print("可用的键列表:")
        a = ''
        for i, key in enumerate(keys_list, 1):
            a += f"{i}.{key}  "
        print(a)

        # 用户选择键
        selected_indexes = input("请选择要筛选的键编号(多个编号用空格分隔，如: 1 3 5): ")
        if not selected_indexes.strip():
            print("未选择任何键，返回原始数据")
            return data

        try:
            # 解析用户选择的编号
            selected_indices = [int(i.strip()) for i in selected_indexes.split(" ") if i.strip()]
            selected_keys = []
            for idx in selected_indices:
                if 1 <= idx <= len(keys_list):
                    selected_keys.append(keys_list[idx - 1])
                else:
                    print(f"警告: 编号 {idx} 超出范围，已忽略")

            if not selected_keys:
                print("没有有效的键被选中，返回原始数据")
                return data

        except ValueError:
            print("输入格式错误，返回原始数据")
            return data

        print(f"已选择的键: {', '.join(selected_keys)}")

        # 先筛选包含所有选定键的项目
        filtered_data = [item for item in data if all(key in item for key in selected_keys)]

        # 只保留选定的键
        result_data = []
        for item in filtered_data:
            new_item = {key: item[key] for key in selected_keys if key in item}
            result_data.append(new_item)
        return result_data

    elif choice == "2":
        filter = data
    else:
        print("输入错误")
        raise ValueError("输入错误")
    return filter


# 数据处理
def json2csv(data):
    # 转换为 DataFrame，自动包含所有字段
    df = pd.DataFrame(data)
    outputname = outputName()
    df.to_csv(outputname, index=False, encoding="utf_8_sig")
    print(f"✅ 已生成 CSV: {outputname}")


# 获取文件名
def outputName():
    global filePath
    if filePath:
        filename = os.path.basename(filePath)
        filename = filename.split(".")[0]
        filename = filename + "_" + "output_" + datetime.now().strftime("%Y%m%d%H%M%S") + ".csv"
        return filename
    return None


# 主函数
def main():
    print("Hello World")
    try:
        print("开始获取数据")
        # 获取数据
        data: dict = getJson()
        print("数据获取成功")
        # 字段处理
        data: list = iField(data)
        print("字段处理成功")
        # 数据筛选
        data = Filter(data)
        print("数据筛选成功")
        # csv处理
        json2csv(data)
        print("csv处理成功")

    except ValueError as e:
        print(e)
        return
    # print("数据输出:", data)


if __name__ == '__main__':
    # iptv
    CONFIG = {
        "Xinput": False,
        "defaultJsonSrc": "2",  # 默认json来源 本地 或 网络
        "filePath": "input.json",  # 默认json文件路径
        "urlPath": "https://iptv-org.github.io/api/channels.json",  # 默认json链接
        "defaultIField": "2",  # 默认是否有字段
        "defaultFilter": "1",  # 默认是否有数据筛选
    }

    # 运行
    main()
