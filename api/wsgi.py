from main import create_app

# Entry point for uWSGI
application = create_app()

if __name__ == "__main__":
	application.run(port=8000)