fe:
	@echo "Frontend start development server..."
	cd src && yarn dev

build-fe:
	@echo "Frontend build..."
	cd src && yarn build

preview-fe:
	@echo "Frontend preview build..."
	cd src && yarn preview

be:
	@echo "Backend start development server..."
	cd backend && npm run dev

