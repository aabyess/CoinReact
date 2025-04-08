import os
from dotenv import load_dotenv
import pybithumb

# .env 파일 로딩
load_dotenv()

con_key = os.getenv("BITHUMB_API_KEY")
sec_key = os.getenv("BITHUMB_SECRET_KEY")

bithumb = pybithumb.Bithumb(con_key, sec_key)

def get_my_assets():
    assets = []

    for ticker in bithumb.get_tickers():
        try:
            balance = bithumb.get_balance(ticker)
            if balance and balance[0] and float(balance[0]) > 0:
                amount = float(balance[0])
                avg_buy_price = float(balance[3]) if balance[3] else 0
                current_price = bithumb.get_current_price(ticker)
                valuation = amount * current_price
                buy_value = amount * avg_buy_price
                profit = valuation - buy_value if avg_buy_price > 0 else 0

                asset = {
                    "ticker": ticker,
                    "amount": amount,
                    "valuation": valuation,

                }
                assets.append(asset)
        except Exception as e:
            print(f"🚨 Error processing {ticker}: {e}")

    return assets


