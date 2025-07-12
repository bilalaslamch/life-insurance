# Life Insurance Backend API

A NestJS-based backend API for life insurance recommendations, featuring a simple recommendation engine that suggests insurance policies based on user input.

## 🚀 Features

### Core Functionality
- **Insurance Recommendations**: Generate life insurance policy recommendations based on user criteria
- **User Submissions**: Store and track user submissions for recommendations
- **Rule-based Logic**: Simple recommendation engine with age and risk tolerance factors

### Technical Features
- **RESTful API**: Clean, well-documented REST endpoints
- **Database Integration**: PostgreSQL with TypeORM for data persistence
- **Validation**: Input validation using class-validator
- **Docker Support**: Complete containerization for easy deployment
- **CORS Enabled**: Cross-origin resource sharing enabled

## 🛠 Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Containerization**: Docker & Docker Compose
- **Testing**: Jest

## 📋 Prerequisites

- Node.js 20+ 
- PostgreSQL 15+
- Docker & Docker Compose (for containerized deployment)
- npm or yarn package manager

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd life-insurance-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local .env
   # Edit .env with your database credentials
   ```

4. **Start PostgreSQL** (if not using Docker)
   ```bash
   # Ensure PostgreSQL is running on port 5432
   # Create database: life_insurance_db
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3001`

### Option 2: Docker Development (Recommended)

1. **Clone and navigate to project**
   ```bash
   git clone <repository-url>
   cd life-insurance-backend
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - API: `http://localhost:3001`
   - Database: `localhost:5433`

## 📚 API Documentation

### Available Endpoints

#### Health Check
- `GET /` - Returns "Hello World!" message

#### Recommendations
- `POST /recommendation` - Generate insurance recommendation

**Request Body:**
```json
{
  "age": 35,
  "income": 75000,
  "numberOfDependents": 2,
  "riskTolerance": "HIGH"
}
```

**Response:**
```json
{
  "recommendation": "Term Life – $500,000 for 20 years",
  "explanation": "Young age with high risk tolerance makes term life cost-effective and flexible."
}
```

**Risk Tolerance Options:**
- `HIGH` - For aggressive investment preferences
- `LOW` - For conservative investment preferences

## 🧪 Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🐳 Docker Commands

```bash
# Development
docker-compose up --build

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Access database
docker exec -it life_insurance_db psql -U postgres -d life_insurance_db
```

## 🚀 AWS Deployment

### Option 1: AWS ECS (Elastic Container Service)

#### Prerequisites
- AWS CLI configured
- Docker installed
- ECR repository created

#### Step-by-Step Deployment

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name life-insurance-backend
   ```

2. **Build and Push Docker Image**
   ```bash
   # Get ECR login token
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

   # Build image
   docker build -t life-insurance-backend .

   # Tag image
   docker tag life-insurance-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/life-insurance-backend:latest

   # Push to ECR
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/life-insurance-backend:latest
   ```

3. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name life-insurance-cluster
   ```

4. **Create Task Definition**
   ```json
   {
     "family": "life-insurance-backend",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
     "containerDefinitions": [
       {
         "name": "backend",
         "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/life-insurance-backend:latest",
         "portMappings": [
           {
             "containerPort": 3001,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "DB_HOST",
             "value": "<rds-endpoint>"
           },
           {
             "name": "DB_PORT",
             "value": "5432"
           },
           {
             "name": "DB_USER",
             "value": "postgres"
           },
           {
             "name": "DB_PASSWORD",
             "value": "<db-password>"
           },
           {
             "name": "DB_NAME",
             "value": "life_insurance_db"
           }
         ],
         "logConfiguration": {
           "logDriver": "awslogs",
           "options": {
             "awslogs-group": "/ecs/life-insurance-backend",
             "awslogs-region": "us-east-1",
             "awslogs-stream-prefix": "ecs"
           }
         }
       }
     ]
   }
   ```

5. **Create RDS Database**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier life-insurance-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username postgres \
     --master-user-password <secure-password> \
     --allocated-storage 20 \
     --vpc-security-group-ids <security-group-id>
   ```

6. **Create ECS Service**
   ```bash
   aws ecs create-service \
     --cluster life-insurance-cluster \
     --service-name life-insurance-service \
     --task-definition life-insurance-backend:1 \
     --desired-count 2 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[<subnet-1>,<subnet-2>],securityGroups=[<security-group-id>],assignPublicIp=ENABLED}"
   ```

### Option 2: AWS Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB Application**
   ```bash
   eb init life-insurance-backend --platform node.js --region us-east-1
   ```

3. **Create Environment**
   ```bash
   eb create life-insurance-production --instance-type t3.small --database.engine postgres --database.instance db.t3.micro
   ```

4. **Deploy**
   ```bash
   eb deploy
   ```

## 🔧 Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=life_insurance_db

# Application Configuration
PORT=3001
NODE_ENV=development
```

## 📁 Project Structure

```
src/
├── app.controller.ts        # Main application controller
├── app.service.ts          # Main application service
├── app.module.ts           # Root application module
├── main.ts                 # Application entry point
├── config/                 # Configuration files
└── recommendation/         # Recommendation module
    ├── recommendation.controller.ts
    ├── recommendation.service.ts
    ├── recommendation.module.ts
    ├── dto/
    │   └── create-recommendation.dto.ts
    └── entity/
        └── user-submission.entity.ts
```


