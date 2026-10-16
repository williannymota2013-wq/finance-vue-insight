import yfinance as yf

# Consultar ações da Petrobras
petrobras = yf.Ticker("PETR4.SA")

# Buscar histórico dos últimos 30 dias
dados = petrobras.history(period="1mo")

print(dados)