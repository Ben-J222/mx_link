# backend/Makefile

.PHONY: help up down logs reset install

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Démarre les services Docker
	docker compose up -d
	@echo "✅ Services démarrés:"
	@echo "🐘 PostgreSQL: localhost:5432"
	@echo "🔴 Redis: localhost:6379"
	@echo "📊 Adminer: http://localhost:8080"

down: ## Arrête les services
	docker compose down

logs: ## Affiche les logs
	docker compose logs -f

reset: ## Reset complet (⚠️ supprime les données)
	docker compose down -v
	docker compose up -d

install: ## Installation complète
	composer install
	make up
	sleep 5
	php bin/console doctrine:database:create --if-not-exists
	@echo "✅ Installation terminée"

serve: ## Lance le serveur Symfony
	symfony server:start -d
	@echo "🚀 API: http://localhost:8000"

stop: ## Arrête tout
	symfony server:stop
	make down

status: ## Statut des services
	@echo "🐳 Docker:"
	@docker compose ps
	@echo "🚀 Symfony:"
	@symfony server:status