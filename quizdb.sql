-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 06:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quizdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `Id` int(11) NOT NULL,
  `Question_Answer` longtext NOT NULL,
  `Is_Correct` tinyint(1) NOT NULL,
  `Questions_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aspnetroleclaims`
--

CREATE TABLE `aspnetroleclaims` (
  `Id` int(11) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aspnetroles`
--

CREATE TABLE `aspnetroles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aspnetroles`
--

INSERT INTO `aspnetroles` (`Id`, `Name`, `NormalizedName`, `ConcurrencyStamp`) VALUES
('0fd06287-757e-4c9b-b8d4-80da92dd7f32', 'QuizUser', 'QUIZUSER', NULL),
('6544f21c-d6ae-43c6-916b-e786098b76b8', 'Admin', 'ADMIN', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aspnetuserclaims`
--

CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aspnetuserlogins`
--

CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aspnetuserroles`
--

CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aspnetuserroles`
--

INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES
('467ea42a-0bfa-4785-ba20-3004e5fe4d9a', '0fd06287-757e-4c9b-b8d4-80da92dd7f32'),
('4c85ab7b-77f7-4818-93be-b3017b2098bc', '0fd06287-757e-4c9b-b8d4-80da92dd7f32'),
('4c85ab7b-77f7-4818-93be-b3017b2098bc', '6544f21c-d6ae-43c6-916b-e786098b76b8'),
('6d9cb35a-0280-43e4-8c14-88d50354112c', '0fd06287-757e-4c9b-b8d4-80da92dd7f32'),
('82251988-0a20-4176-af6f-9a17745c018c', '0fd06287-757e-4c9b-b8d4-80da92dd7f32'),
('c616288b-b924-4cc7-869b-3ca4b8d6b2e4', '0fd06287-757e-4c9b-b8d4-80da92dd7f32');

-- --------------------------------------------------------

--
-- Table structure for table `aspnetusers`
--

CREATE TABLE `aspnetusers` (
  `Id` varchar(255) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aspnetusers`
--

INSERT INTO `aspnetusers` (`Id`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('467ea42a-0bfa-4785-ba20-3004e5fe4d9a', 'testas', 'TESTAS', 'testas@testas.com', 'TESTAS@TESTAS.COM', 0, 'AQAAAAIAAYagAAAAELk6eHiRycO4eIwvYzGDcKTyHdldIpQOmF78lbg02r29dC15Sb+D0/mQuzUiJs8vnA==', 'NAHLRNUGDWI6OW6TNUQZAAPJ5C4SSJS2', '0e24047b-b913-491a-aa19-8b1be383aa8e', NULL, 0, 0, NULL, 1, 0),
('4c85ab7b-77f7-4818-93be-b3017b2098bc', 'admin', 'ADMIN', 'admin@admin.com', 'ADMIN@ADMIN.COM', 0, 'AQAAAAIAAYagAAAAENLxA8/OzABDZ3IyvNh60D92u8U9hIQwFfFLuI2deTxgO09ok22M9anKtoWvidjkIQ==', 'H2GG5HPGAMT2YGCUSLVTEVEKHZGGQ35C', 'e6a58a13-6007-4ce8-82c8-600099eaf9df', NULL, 0, 0, NULL, 1, 0),
('6d9cb35a-0280-43e4-8c14-88d50354112c', 'Mantas', 'MANTAS', 'mantas@gmail.com', 'MANTAS@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEEdxT1I5Kr3sUC6R43ubAO4SL+ztEiX2qaVEPmYoUBRhe9PsCAMtyX9cSQ13vKlDaw==', 'JXX5VWW5KZW6P2P6QYJFXERBHPYLV27P', '1e1739d2-0e17-4c92-b41f-67b1565019d3', NULL, 0, 0, NULL, 1, 0),
('82251988-0a20-4176-af6f-9a17745c018c', 'naujasemail@mail.com', 'NAUJASEMAIL@MAIL.COM', 'asdasdasdasd@asd.lt', 'ASDASDASDASD@ASD.LT', 0, 'AQAAAAIAAYagAAAAENIysA3yAm4XLlE5gBxwtbN3pWoSLBDJ9bqj1bS2E5myY+YSyBVZHFRlKKKLc/LJuw==', '6R2FVXSLKPXMB5A7OAZLXMST2VF2N4W7', 'd2fa5438-e07d-410c-9211-79205101975f', NULL, 0, 0, NULL, 1, 0),
('c616288b-b924-4cc7-869b-3ca4b8d6b2e4', 'manvan1', 'MANVAN1', 'mantasv@gmail.com', 'MANTASV@GMAIL.COM', 0, 'AQAAAAIAAYagAAAAEFIAI7fiLrzCzgDHTBXA5F1r4AYeBymsQ654IdKhRYKbSdLov4oMb+xXNC8RE6K5dw==', 'NJ2GZZM44ZPIYN6PRY7NGD3JTA5J77XN', '955f8949-0fab-4391-b798-21555e6d44d9', NULL, 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `aspnetusertokens`
--

CREATE TABLE `aspnetusertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `Id` int(11) NOT NULL,
  `QuestionText` longtext NOT NULL,
  `Quiz_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `Id` int(11) NOT NULL,
  `Title` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `Creation_Date` datetime(6) NOT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`Id`, `Title`, `Description`, `Creation_Date`, `UserId`) VALUES
(2, 'testTitle', 'testDesciption', '2024-11-22 00:00:00.000000', '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
(3, 'testTitle', 'testDesciption', '2024-11-22 00:00:00.000000', '4c85ab7b-77f7-4818-93be-b3017b2098bc');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `LastRefreshToken` longtext NOT NULL,
  `InitiatedAt` datetime(6) NOT NULL,
  `ExpiresAt` datetime(6) NOT NULL,
  `IsRevoked` tinyint(1) NOT NULL,
  `UserId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`Id`, `LastRefreshToken`, `InitiatedAt`, `ExpiresAt`, `IsRevoked`, `UserId`) VALUES
('11650088-52ef-400c-b188-e94f89928b5f', 'ZND3vkCShmOXtx76Cu306BvqFYDxyPugTcSJtFk0LOs=', '2024-12-20 05:09:24.890177', '2024-12-23 05:09:24.869820', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('17b9e36e-c75f-464f-a39c-ea40f881a606', 'YsyhlDnpVLuZL6+TkwBVxf/zVqABmnKZEpu7UoswDf0=', '2024-12-20 04:48:15.396275', '2024-12-23 04:48:15.396131', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('236587a5-8038-4f2a-84d9-f0b3b089b124', 'yxB2SykjkrFgZTuE+pL1wyZKOw0ygySZvrT3nV6MoiI=', '2024-12-20 04:59:07.914378', '2024-12-23 04:59:07.914167', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('38383e11-14d2-42c5-a500-d8f7fa22dbf5', '9MnQLNlOyd+aK7Hkr4voMfVgvsf237EC9yBc1vU0Ynw=', '2024-12-20 04:35:14.409486', '2024-12-23 04:35:14.403964', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('3b39a3ed-2fd8-46e6-811e-9e6036333b88', 'GtDjqE+8JhCw+eD+PfphNm5E+1Z0GfsN5jETWzlIvdg=', '2024-12-20 04:44:09.711766', '2024-12-23 04:44:09.692608', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('49cbbac6-9a81-4fd1-86a4-a925e80f0cbf', 'JcT/FS1S6wIY64HymZXOntZbOwCaj+Jm4t9SFCzCsDY=', '2024-12-20 04:54:03.194776', '2024-12-23 04:54:03.177106', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('49e02f63-0d6d-4e8b-9c97-9e7f6468c76f', 'dqz+a3P/1Ksuh19Rckzmz/2p0xeHUnm9oaGlkfaBKhU=', '2024-11-21 22:35:10.083240', '2024-11-24 22:35:58.876553', 1, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('4e110741-01f8-4c6e-b940-0f0b30cd49b9', 'Duq4RpUzwAQDQuGYhIPe5Yt7/6Aj1ciGbPHEZ1Cdt78=', '2024-12-20 05:18:17.107401', '2024-12-23 05:18:17.088721', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('5849777e-0de7-4a13-bcfb-8229a6d12e0e', '94CHO3HeZGDrbNTZG1EXnLFyHKjE04qxhgu9UA0ugUg=', '2024-12-20 04:51:17.999709', '2024-12-23 04:51:17.979498', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('5d08dfde-76da-409f-840f-68ae5123268f', 'iZcJkk2HbAfDZvPqjwQ/1+4EsGYES1/zh9Zbm33atVU=', '2024-11-21 22:47:38.098091', '2024-11-24 22:47:44.290099', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('66255988-e050-47bf-963f-b304345665e3', 'EsU1PsmOSVDzUTXB8rwFi43bWheSMwAnWWIk5PtwZds=', '2024-12-20 04:25:16.733815', '2024-12-23 04:25:16.712330', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('756131ad-408a-40b8-b3f7-a27df4be160d', 'e8kGSWCcvYb3G/N0ruBiYEnmmYSitqOkotyBXHtEs9Q=', '2024-11-21 23:28:05.534288', '2024-11-24 23:28:05.533604', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('826242e3-9ea6-482b-ba4d-eb0a5850ae3f', 'Wl4uCsDAHzlBb772BUwhfRaSb+F/Q3vyBm2H1d3prdI=', '2024-12-20 04:31:22.697290', '2024-12-23 04:31:22.697055', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('83c85e95-6463-4a0a-a09a-629e454364c7', 'bbCgtewiM6sQuis9ghxGxPZ4aqEMGxh7JfCTI60ZwqM=', '2024-12-20 04:40:37.098333', '2024-12-23 04:40:37.079164', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('8c45fb63-6d18-459b-885e-f2e6169ee462', 'aCO1ORNYZj3ZM6WPcFt+IMRaVxR+BkvidjXzRvMr0qc=', '2024-11-22 00:01:36.785026', '2024-11-25 00:01:36.756433', 0, '467ea42a-0bfa-4785-ba20-3004e5fe4d9a'),
('924a3720-4673-4628-a7d0-971eff6102ad', 'dggDLw5a3nkiohdRLAU5vU8IVs1b01s0ISXuOTgQsMg=', '2024-12-20 05:05:26.253211', '2024-12-23 05:05:26.233519', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('9ea8debf-6071-405b-82c8-b00abb0992b2', '4nhAQHK+RBf+/jAX7hZmZAg9FyB0c736vC+bbysCBII=', '2024-11-21 22:39:33.869470', '2024-11-24 22:39:33.845171', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('a520d77a-79cf-4be3-82d7-fd45708bc390', 'Do0smk3bWGVw2dUN6F4xcabgVB4KGWeXfSzDZgYd3jY=', '2024-12-20 04:17:27.691292', '2024-12-23 04:17:27.672740', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('b0b8a106-f4fe-4b3d-99fc-4f28d7a575a2', 'c9gW7GbRlv7a5VkADRN2IPvHwahNY4n7nlw2BmX82sQ=', '2024-11-21 22:52:42.737765', '2024-11-24 22:52:42.714070', 1, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('b4293788-ed39-4bca-90d8-215cefc12165', '755NREjtd3NfDT80mfnx+Z8xB7+zDZZorMedogVJANc=', '2024-12-20 04:29:58.378565', '2024-12-23 04:29:58.378335', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('c6a59887-d79a-44ae-bef1-3fe748acaa17', 'RwWYZky2ZhoATX1c4v3zq1IOU2gS+32YNLwNu7b+Pak=', '2024-12-20 04:35:36.393631', '2024-12-23 04:35:36.392423', 1, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('c786861f-32c0-4fc8-9dce-a8083df79381', 'zBZ+RMdbiokuI+/6FdQwilr1LyRHpBvlOsuiT5eveSA=', '2024-12-20 05:03:37.858901', '2024-12-23 05:03:37.839619', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('d81962fb-becc-409f-81df-d9387b599192', '3ulxZsZhvKe7SZvzZJ7Ke90+ser2YWSfQlhH1EWcseo=', '2024-12-20 04:44:24.725720', '2024-12-23 04:44:24.725573', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('d85fab6b-cedc-4754-8a52-4e36a6e1614c', 'dYNyjadGQZp6GGhCZX3m4E7qN8cL2uphuJw7cxvhkQ8=', '2024-12-20 04:41:20.557395', '2024-12-23 04:41:20.557252', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('f22eb13e-d675-43b5-8b6d-f22db2fbc227', 'Zt9DtfFc8ASFh6lUjo2t/cWJWA5XUggTsIng6GfjOvw=', '2024-11-21 23:27:21.846896', '2024-11-24 23:27:21.821205', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('f4d62a8e-50d9-4ec6-96f3-01cb0d187811', 'ZQl2LGZxSZxLHjHSaeopNIQFIeOUhx8EqnGM+SErZ1s=', '2024-12-20 04:57:20.882804', '2024-12-23 04:57:20.882637', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('f6018b5c-47cb-4ff8-87a8-cb9fc8317feb', '+GJwtzq7lw002OG4dProV407XQKVEqRoVJDEySJaGfg=', '2024-12-20 04:38:43.842485', '2024-12-23 04:38:43.842260', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4'),
('f8be85fd-205d-49f2-ae70-3236b29f6daf', 'CkTDDv35ekYxV7QTC3XIz2WMndOKHp2GLjb1vRsPPRU=', '2024-12-20 02:55:42.697329', '2024-12-23 02:55:46.069869', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('f927c0ff-a092-445f-ac9a-04774d866066', 'AenYGux5TF6kkEcTdize3Ld2hfZ0qgekCwaJQ0zO2Ao=', '2024-11-22 00:02:42.067224', '2024-11-25 00:02:42.066065', 0, '4c85ab7b-77f7-4818-93be-b3017b2098bc'),
('f9901509-109d-4fa0-9029-6c53d184be21', 'lC2/QjeXQVlFPuPzwoTAzFcgUd2QxG8U2LcnrHJCawk=', '2024-12-20 05:14:33.495211', '2024-12-23 05:14:33.495061', 0, 'c616288b-b924-4cc7-869b-3ca4b8d6b2e4');

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20241121205907_identity', '8.0.10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- Indexes for table `aspnetroles`
--
ALTER TABLE `aspnetroles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- Indexes for table `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- Indexes for table `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- Indexes for table `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- Indexes for table `aspnetusers`
--
ALTER TABLE `aspnetusers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- Indexes for table `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Quizzes_UserId` (`UserId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Sessions_UserId` (`UserId`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aspnetroleclaims`
--
ALTER TABLE `aspnetroleclaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `aspnetuserclaims`
--
ALTER TABLE `aspnetuserclaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `aspnetuserlogins`
--
ALTER TABLE `aspnetuserlogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `aspnetuserroles`
--
ALTER TABLE `aspnetuserroles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `aspnetroles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `aspnetusertokens`
--
ALTER TABLE `aspnetusertokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `FK_Quizzes_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `FK_Sessions_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
