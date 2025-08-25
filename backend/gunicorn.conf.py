# Gunicorn config file
import multiprocessing

# Socket path
bind = "unix:/run/gunicorn.sock"

# Worker class
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"

# Logging
loglevel = "info"
accesslog = "-"
errorlog = "-"
