# main.py
from api.bithumbClient import get_my_assets

if __name__ == "__main__":
    assets = get_my_assets()
    for asset in assets:
        print(asset)