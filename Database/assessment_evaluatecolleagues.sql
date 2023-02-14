-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: assessment
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `evaluatecolleagues`
--

DROP TABLE IF EXISTS `evaluatecolleagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluatecolleagues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `section` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id_idx` (`employee_id`),
  CONSTRAINT `employee_id_eval` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluatecolleagues`
--

LOCK TABLES `evaluatecolleagues` WRITE;
/*!40000 ALTER TABLE `evaluatecolleagues` DISABLE KEYS */;
INSERT INTO `evaluatecolleagues` VALUES (23,'s,s,a,a,a,a,a,a,a,a,a,a,a,a,a',19,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(24,'z,z,z,z,z,z,z,z,z,z,z,z,z,z,z',13,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(25,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',9,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(26,'asdasd,asdasd,asd,asd,asd,asd,asd,asd,asd,asd,asd,asd,,,',9,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(27,',,,,,,,,,,,,,,a',13,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(28,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',15,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(29,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',13,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(30,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',13,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(31,'=,=,=,=,=,=,=,=,=,=,=,=,=,=,=',17,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(32,'a,a,a,=,=,=,=,=,=,=,=,=,=,=,=',14,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(33,'p,a,-,=,=,=,=,=,=,=,=,=,=,=,=',9,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(34,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',13,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(35,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',NULL,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(36,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',NULL,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(37,'-,-,-,-,-,-,-,-,-,-,-,-,-,-,-',NULL,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2'),(38,'-,-,-,-,-,-,,-,-,-,-,-,-,-,-',NULL,'1.1:1.2:1.3:1.4:1.5:1.6:1.7:1.8:1.9:1.10:1.11:1.12:1.13:2.1:2.2');
/*!40000 ALTER TABLE `evaluatecolleagues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-02  9:16:05
