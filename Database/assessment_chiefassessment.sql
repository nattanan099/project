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
-- Table structure for table `chiefassessment`
--

DROP TABLE IF EXISTS `chiefassessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chiefassessment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assessmentscore` varchar(500) DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `chiefassessmenttype` varchar(100) DEFAULT NULL,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `other` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id3_idx` (`employee_id`),
  CONSTRAINT `employee_id3` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=391 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chiefassessment`
--

LOCK TABLES `chiefassessment` WRITE;
/*!40000 ALTER TABLE `chiefassessment` DISABLE KEYS */;
INSERT INTO `chiefassessment` VALUES (382,'10,8,6,4,2,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0',15,'1.1,1.2,1.3,1.4,1.5||2.2,2.3,2.4,2.5,2.6,2.7,2.1||3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8','2022-11-29 10:10:13',' , , , , , , , , , , , , , , '),(383,'10,8,6,4,2,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ตามมาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ต่ำกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ต่ำกว่ามาตรฐาน,0',19,'1.1,1.2,1.3,1.4,1.5||2.2,2.3,2.4,2.5,2.6,2.7,2.1||3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8','2022-11-29 10:13:26',' , , , , , , , , , , , , , , '),(389,'10,8,6,4,2,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ตามมาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ต่ำกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ต่ำกว่ามาตรฐาน,0',9,'1.1,1.2,1.3,1.4,1.5||2.2,2.3,2.4,2.5,2.6,2.7,2.1||3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8','2022-11-29 10:13:26',' , , , , , , , , , , , , , , '),(390,'10,8,6,4,2,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ตามมาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ต่ำกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ดีกว่ามาตรฐาน,0,ตามมาตรฐาน,0,ต่ำกว่ามาตรฐาน,0',9,'1.1,1.2,1.3,1.4,1.5||2.2,2.3,2.4,2.5,2.6,2.7,2.1||3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8','2022-11-29 10:13:26',' , , , , , , , , , , , , , , ');
/*!40000 ALTER TABLE `chiefassessment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-02  9:16:04
