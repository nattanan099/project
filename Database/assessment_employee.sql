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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `usertype` tinyint DEFAULT NULL,
  `sex_id` int DEFAULT NULL,
  `subdepartment_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sex_id_idx` (`sex_id`),
  KEY `department_id_idx` (`department_id`),
  KEY `subdepartment_id_idx` (`subdepartment_id`),
  KEY `company_id_idx` (`company_id`),
  CONSTRAINT `company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `sex_id` FOREIGN KEY (`sex_id`) REFERENCES `sex` (`id`),
  CONSTRAINT `subdepartment_id` FOREIGN KEY (`subdepartment_id`) REFERENCES `subdepartment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (9,'aaa','aaa','a','a',1,'hr','hr',3,2,1,1),(13,'s','s','s','s',1,'em','em',4,2,1,2),(14,'test','test','test','test',1,'mana','mana',1,2,1,3),(15,'ss','ss','ss','ss',4,'le2','le2',2,1,4,1),(16,'v','v','v','v',1,'le','le',2,1,1,2),(17,'sd','sd','sd','sd',1,'sd','sd',1,1,1,3),(18,'zx','zx','zx','zx',2,'zx','zx',1,1,2,1),(19,'premza','premza','premza','aaaa',4,'premza','123',2,1,5,2),(20,'premzzz','premzzz','premzzz','premzzz',4,'premzzz','123',2,1,6,3),(21,'zz','zz','zz','zz',2,'zz','zz',2,2,2,1),(22,'test','test','test','testt',4,'testt','testt',1,1,4,2),(23,'asdasd','asdasd','asdasd','asdasd',1,'sssdasd','asdasdasd',1,1,1,3),(27,'zxczxczxc','zxczxczxc','zxczxczxc','zxczxczxc',2,'1','1',2,1,2,1),(28,'sa','sa','sa','sa',1,'2','2',4,1,1,2),(29,'m','m','m','m',1,'m','m',1,1,1,3);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
