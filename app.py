from flask import Flask
import yfinance as yf

app = Flask(__name__)

@app.route("/getColor/<stock>")
def get_color(stock):
    data = yf.download(stock)
    market_price = data['Close'].iloc[-1]
    previous_close_price = data['Close'].iloc[-2]

    if(market_price > previous_close_price):
            response = 'green'
    else:
        response = 'red'
    
    response_headers = {
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500"
    }

    return response, 200, response_headers



# def get_color(stock):
#     ticker = yf.Ticker(stock).info
#     market_price = ticker['regularMarketPrice']
#     previous_close_price = ticker['regularMarketPreviousClose']

#     return market_price - previous_close_price