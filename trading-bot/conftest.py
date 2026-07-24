import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# dashboard.py refuses to import unless these are set, since it's designed
# to be reachable from outside localhost - give the test suite harmless
# defaults so importing it doesn't require a real .env.
os.environ.setdefault("DASHBOARD_USERNAME", "test_user")
os.environ.setdefault("DASHBOARD_PASSWORD", "test_pass")
