-- MySQL dump 10.13  Distrib 5.7.18, for macos10.12 (x86_64)
--
-- Host: localhost    Database: alpinehut_db
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE `alpinehut_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `alpinehut_db`;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Login` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `ProfileID` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Salt` varchar(255) DEFAULT NULL,
  `Role` enum('regular','admin') DEFAULT 'regular',
  `Status` tinyint(4) DEFAULT '0',
  `SessionID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `Login` (`Login`),
  KEY `auth_profiles_ID_fk` (`ProfileID`),
  CONSTRAINT `auth_profiles_ID_fk` FOREIGN KEY (`ProfileID`) REFERENCES `profiles` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'test','$2a$10$G5fsf4iJOZV/Gux8da2Bce0T1IIt8ocxWJhAtLnLi07lMDbvIzD.i',1,'','$2a$10$G5fsf4iJOZV/Gux8da2Bce','regular',0,'f0b1dccb11b44510e11eda572ce13b2bc6be87ef');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EntityType` varchar(16) DEFAULT NULL,
  `EntityID` int(11) DEFAULT NULL,
  `Data` json DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `history_EntityType_EntityID_Created_index` (`EntityType`,`EntityID`,`Created`)
) ENGINE=InnoDB AUTO_INCREMENT=319285 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `object_3d_references`
--

DROP TABLE IF EXISTS `object_3d_references`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `object_3d_references` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` enum('point','custom','box') DEFAULT 'custom',
  `Config` json DEFAULT NULL,
  `ActiveIn` enum('floor1Part','floor2Part','verandaPart','floor3Part','fireplacePart') DEFAULT 'floor1Part',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `object_3d_reference_ID_uindex` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `object_3d_references`
--

LOCK TABLES `object_3d_references` WRITE;
/*!40000 ALTER TABLE `object_3d_references` DISABLE KEYS */;
INSERT INTO `object_3d_references` VALUES (1,'point','{\"Radius\": 0.5, \"ActiveIn\": \"floor2Part\", \"Position\": {\"x\": 1, \"y\": 1, \"z\": 1}}','floor2Part'),(2,'box','{\"ActiveIn\": \"floor2Part\", \"Position\": {\"x\": 4.1, \"y\": 3.2, \"z\": 1.7}, \"Rotation\": {\"Axis\": {\"x\": 1, \"y\": 0, \"z\": 0}, \"Angle\": 0}, \"Dimensions\": {\"x\": 3.8, \"y\": 0.1, \"z\": 3}}','floor2Part'),(3,'point','{\"Radius\": 0.5, \"ActiveIn\": \"floor2Part\", \"Position\": {\"x\": 4.5, \"y\": 3, \"z\": 1.7}}','floor2Part'),(4,'box','{\"ActiveIn\": \"floor2Part\", \"Position\": {\"x\": 4.45, \"y\": 3.2, \"z\": 5.6}, \"Rotation\": {\"Axis\": {\"x\": 1, \"y\": 0, \"z\": 0}, \"Angle\": 0}, \"Dimensions\": {\"x\": 2.5, \"y\": 0.1, \"z\": 4.2}}','floor2Part');
/*!40000 ALTER TABLE `object_3d_references` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peripheral_group_peripherals`
--

DROP TABLE IF EXISTS `peripheral_group_peripherals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peripheral_group_peripherals` (
  `PeripheralID` int(11) DEFAULT NULL,
  `PeripheralGroupID` int(11) DEFAULT NULL,
  UNIQUE KEY `peripheral_group_peripherals_PeripheralGroupID_PeripheralID_pk` (`PeripheralGroupID`,`PeripheralID`),
  KEY `peripheral_group_peripherals_peripherals_ID_fk` (`PeripheralID`),
  CONSTRAINT `peripheral_group_peripherals_peripheral_groups_ID_fk` FOREIGN KEY (`PeripheralGroupID`) REFERENCES `peripheral_groups` (`ID`),
  CONSTRAINT `peripheral_group_peripherals_peripherals_ID_fk` FOREIGN KEY (`PeripheralID`) REFERENCES `peripherals` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peripheral_group_peripherals`
--

LOCK TABLES `peripheral_group_peripherals` WRITE;
/*!40000 ALTER TABLE `peripheral_group_peripherals` DISABLE KEYS */;
INSERT INTO `peripheral_group_peripherals` VALUES (1,1),(2,1),(3,2),(4,2);
/*!40000 ALTER TABLE `peripheral_group_peripherals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peripheral_groups`
--

DROP TABLE IF EXISTS `peripheral_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peripheral_groups` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) DEFAULT NULL,
  `Data` mediumtext,
  `Description` mediumtext,
  `Type` enum('heating_system') DEFAULT NULL,
  `Object3DReferenceID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `peripheral_groups_ID_uindex` (`ID`),
  KEY `peripheral_groups_object_3d_reference_ID_fk` (`Object3DReferenceID`),
  CONSTRAINT `peripheral_groups_object_3d_reference_ID_fk` FOREIGN KEY (`Object3DReferenceID`) REFERENCES `object_3d_references` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peripheral_groups`
--

LOCK TABLES `peripheral_groups` WRITE;
/*!40000 ALTER TABLE `peripheral_groups` DISABLE KEYS */;
INSERT INTO `peripheral_groups` VALUES (1,'North Bedroom Heating','{\"TemperatureLimit\":21,\"IsActive\":false,\"TemperatureSensorID\":1,\"HeaterID\":2}','room on the second floor (above the fireplace)','heating_system',2),(2,'South Bedroom heating','{\"TemperatureLimit\":35,\"IsActive\":true,\"TemperatureSensorID\":3,\"HeaterID\":4}','heating of the bedrom 2 upd','heating_system',4);
/*!40000 ALTER TABLE `peripheral_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peripherals`
--

DROP TABLE IF EXISTS `peripherals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peripherals` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) DEFAULT NULL,
  `Data` mediumtext,
  `IsActive` tinyint(1) DEFAULT '0',
  `Type` enum('Sensor','Heater') DEFAULT NULL,
  `Interface` enum('1wire','i2c','spi','direct') DEFAULT NULL,
  `Description` mediumtext,
  `LastUpdate` datetime DEFAULT NULL,
  `Position` json DEFAULT NULL,
  `Object3DReferenceID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `peripherals_ID_uindex` (`ID`),
  KEY `peripherals_object_3d_reference_ID_fk` (`Object3DReferenceID`),
  CONSTRAINT `peripherals_object_3d_reference_ID_fk` FOREIGN KEY (`Object3DReferenceID`) REFERENCES `object_3d_references` (`ID`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peripherals`
--

LOCK TABLES `peripherals` WRITE;
/*!40000 ALTER TABLE `peripherals` DISABLE KEYS */;
INSERT INTO `peripherals` VALUES (1,'Floor Sensor','{\"DeviceID\":\"00000a478246\",\"Temperature\":19.781192641747992}',0,'Sensor','1wire','Датчик температуры пола в комнате над камином','2018-08-28 23:54:06',NULL,1),(2,'Floor Heater','{\"Pin\":11,\"Active\":\"HIGH\"}',0,'Heater','direct','Пленочный нагреватель теплого пола в комнате над камином','2018-08-28 21:11:43',NULL,2),(3,'Floor Sensor','{\"DeviceID\":\"00000a478247\",\"Temperature\":14.273921244398302}',0,'Sensor','1wire','Temperature sensor in the bedroom 2','2022-05-18 11:18:09',NULL,3),(4,'Floor Heater','{\"Pin\":12,\"Active\":\"HIGH\"}',1,'Heater','direct','Floor heater in the bedroom 2','2022-05-18 11:19:25',NULL,4);
/*!40000 ALTER TABLE `peripherals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peripherals_log`
--

DROP TABLE IF EXISTS `peripherals_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peripherals_log` (
  `PeripheralID` int(11) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Data` mediumtext,
  PRIMARY KEY (`PeripheralID`,`Created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peripherals_log`
--

LOCK TABLES `peripherals_log` WRITE;
/*!40000 ALTER TABLE `peripherals_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `peripherals_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_authorizations`
--

DROP TABLE IF EXISTS `profile_authorizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_authorizations` (
  `ProfileID` int(11) NOT NULL,
  `PeripheralGroupID` int(11) NOT NULL,
  `Access` enum('Read','Setup','Activate') NOT NULL DEFAULT 'Read',
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `PPA_SECONDARY` (`ProfileID`,`PeripheralGroupID`,`Access`),
  UNIQUE KEY `profile_authorizations_ID_uindex` (`ID`),
  KEY `profile_authorizations_peripheral_groups_ID_fk` (`PeripheralGroupID`),
  KEY `profile_authorizations_ProfileID_PeripheralGroupID_index` (`ProfileID`,`PeripheralGroupID`),
  CONSTRAINT `profile_authorizations_peripheral_groups_ID_fk` FOREIGN KEY (`PeripheralGroupID`) REFERENCES `peripheral_groups` (`ID`),
  CONSTRAINT `profile_authorizations_profiles_ID_fk` FOREIGN KEY (`ProfileID`) REFERENCES `profiles` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_authorizations`
--

LOCK TABLES `profile_authorizations` WRITE;
/*!40000 ALTER TABLE `profile_authorizations` DISABLE KEYS */;
INSERT INTO `profile_authorizations` VALUES (1,1,'Read',1),(1,1,'Setup',2),(1,1,'Activate',3),(2,1,'Read',4),(2,1,'Activate',5),(3,1,'Read',6);
/*!40000 ALTER TABLE `profile_authorizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Description` mediumtext,
  `IsAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `profiles_ID_uindex` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Администратор','Пользователь имеет доступ ко всем возможностям управления',1),(2,'Активатор','Доступ к включению/выключению',0),(3,'Наблюдатель','Просмотр данных',0);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'alpinehut_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 21:10:12
