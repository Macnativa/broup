CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientEmail` varchar(320) NOT NULL,
	`clientPhone` varchar(20) NOT NULL,
	`serviceType` varchar(255) NOT NULL,
	`serviceDescription` text,
	`address` text NOT NULL,
	`appointmentDate` timestamp NOT NULL,
	`appointmentTime` varchar(5) NOT NULL,
	`status` enum('pendente','confirmado','concluído','cancelado') NOT NULL DEFAULT 'pendente',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
