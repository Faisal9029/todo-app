#!/usr/bin/env python3
"""
Script to run the console todo application.
"""

if __name__ == "__main__":
    import subprocess
    import sys

    # Run the main application
    result = subprocess.run([sys.executable, "src/main.py"])
    sys.exit(result.returncode)