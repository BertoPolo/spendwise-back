src/
|-- transactions/
| |-- dto/
| | |-- create-transaction.dto.ts // Data Transfer Objects para crear transacciones
| | |-- update-transaction.dto.ts // DTO para actualizar transacciones
| |-- entities/
| | |-- transaction.entity.ts // Entidad que representa una transacción
| |-- repositories/
| | |-- transactions.repository.ts // Repositorio para manejar el acceso a datos de transacciones
| |-- interfaces/
| | |-- transactions.interface.ts // Interfaces para definir la estructura de tus datos (si es necesario)
| |-- transactions.service.ts // Servicio para manejar la lógica de negocio de transacciones
| |-- transactions.controller.ts // Controlador para manejar las solicitudes HTTP
| |-- transactions.module.ts // Módulo de NestJS para agrupar todos los componentes relacionados con transacciones
|-- app.module.ts
