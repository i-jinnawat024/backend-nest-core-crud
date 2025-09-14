# Product Management API

A robust CRUD API for product management built with NestJS, TypeORM, and Clean Architecture principles.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/                 # Business logic and entities
│   ├── entities/           # Domain entities
│   ├── interfaces/         # Repository interfaces
│   └── value-objects/      # Value objects
├── application/            # Use cases and business rules
│   └── use-cases/          # Application use cases
├── infrastructure/         # External concerns
│   ├── database/           # Database configuration
│   └── repositories/       # Repository implementations
└── presentation/           # Controllers and DTOs
    ├── controllers/        # REST API controllers
    ├── dtos/              # Data transfer objects
    └── modules/           # NestJS modules
```

## 🚀 Features

- **Clean Architecture**: Separation of concerns with clear boundaries
- **SOLID Principles**: Following all SOLID design principles
- **Type Safety**: Full TypeScript support with strict type checking
- **Database Agnostic**: Repository pattern supports multiple databases
- **Code First**: TypeORM entities define database schema
- **Validation**: Input validation with class-validator
- **API Documentation**: Swagger/OpenAPI documentation
- **Error Handling**: Comprehensive error handling

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL (configurable)
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-nest-basic-crud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database configuration:
   ```env
   # Database Configuration
   # Option 1: Use DATABASE_URL (recommended for production)
   # DATABASE_URL=postgresql://postgres:your_password@localhost:5432/product_management
   
   # Option 2: Use individual connection parameters
   DB_TYPE=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=product_management
   DB_SYNCHRONIZE=true
   DB_LOGGING=true
   
   PORT=3000
   NODE_ENV=development
   API_PREFIX=api/v1
   ```
   
   **Note:** You can use either `DATABASE_URL` or individual database parameters. If `DATABASE_URL` is provided, it will take precedence over individual parameters.

4. **Database setup**
   - Create a PostgreSQL database named `product_management`
   - The application will automatically create tables on first run

## 🚀 Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Swagger documentation is available at: `http://localhost:3000/api/docs`

## 🔗 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products` | Get all products |
| GET | `/api/v1/products/:id` | Get product by ID |
| POST | `/api/v1/products` | Create new product |
| PUT | `/api/v1/products/:id` | Update product |
| DELETE | `/api/v1/products/:id` | Delete product |

### Query Parameters

- `activeOnly`: Filter active products only (boolean)
- `category`: Filter by category (string)

## 📝 Example Usage

### Create Product
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced camera",
    "price": 999.99,
    "quantity": 100,
    "category": "Electronics",
    "sku": "IPH15P-256-BLK"
  }'
```

### Get All Products
```bash
curl http://localhost:3000/api/v1/products
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/v1/products/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "price": 899.99,
    "quantity": 150
  }'
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🏗️ Project Structure Details

### Domain Layer
- **Entities**: Core business objects (Product)
- **Value Objects**: Immutable objects (ProductPrice, ProductQuantity)
- **Interfaces**: Repository contracts

### Application Layer
- **Use Cases**: Business logic implementation
- **DTOs**: Data transfer objects for use cases

### Infrastructure Layer
- **Repositories**: Database access implementations
- **Database**: Configuration and setup

### Presentation Layer
- **Controllers**: HTTP request handlers
- **DTOs**: API request/response objects
- **Modules**: Dependency injection configuration

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `DATABASE_URL` | Complete database connection URL (takes precedence) | - |
| `DB_TYPE` | Database type | `postgres` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | `product_management` |
| `DB_SYNCHRONIZE` | Auto-sync schema | `true` |
| `DB_LOGGING` | Enable SQL logging | `true` |
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `API_PREFIX` | API route prefix | `api/v1` |

**Database Connection Options:**
- **Option 1 (Recommended):** Use `DATABASE_URL` for a complete connection string
- **Option 2:** Use individual `DB_*` parameters for separate configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.