--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-18 13:49:18


--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE DATABASE expense2

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 35151)
-- Name: tbm_Accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbm_Accounts" (
    account_id integer NOT NULL,
    user_id integer NOT NULL,
    account_name character varying NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public."tbm_Accounts" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 35217)
-- Name: tbm_Accounts_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."tbm_Accounts" ALTER COLUMN account_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbm_Accounts_account_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 35172)
-- Name: tbm_BadWords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbm_BadWords" (
    word_id integer NOT NULL,
    word character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public."tbm_BadWords" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 35222)
-- Name: tbm_BadWords_word_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."tbm_BadWords" ALTER COLUMN word_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbm_BadWords_word_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 35158)
-- Name: tbm_Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbm_Categories" (
    category_id integer NOT NULL,
    user_id integer NOT NULL,
    category_name character varying NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public."tbm_Categories" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 35220)
-- Name: tbm_Categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."tbm_Categories" ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbm_Categories_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 227 (class 1259 OID 35238)
-- Name: tbm_Sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbm_Sessions" (
    session_id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    device_id text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


ALTER TABLE public."tbm_Sessions" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 35253)
-- Name: tbm_Sessions_session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."tbm_Sessions" ALTER COLUMN session_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbm_Sessions_session_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 35144)
-- Name: tbm_Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbm_Users" (
    user_id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public."tbm_Users" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 35204)
-- Name: tbm_Users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."tbm_Users" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbm_Users_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 35165)
-- Name: tbs_Transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tbs_Transactions" (
    transaction_id integer NOT NULL,
    user_id integer NOT NULL,
    account_id integer NOT NULL,
    category_id integer NOT NULL,
    amount integer NOT NULL,
    date date NOT NULL,
    comment character varying,
    slip_image_url character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    transaction_type character varying NOT NULL,
    cdn_public_id character varying
);


ALTER TABLE public."tbs_Transactions" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 35221)
-- Name: tbs_Transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."tbs_Transactions" ALTER COLUMN transaction_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."tbs_Transactions_transaction_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4841 (class 0 OID 35151)
-- Dependencies: 218
-- Data for Name: tbm_Accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbm_Accounts" (account_id, user_id, account_name, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (15, 19, 'dad', '2024-11-17 22:40:34.436839', '2024-11-17 22:40:34.436839');
INSERT INTO public."tbm_Accounts" (account_id, user_id, account_name, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (8, 19, 'mom', '2024-11-15 15:25:21.458816', '2024-11-15 15:25:21.458816');
INSERT INTO public."tbm_Accounts" (account_id, user_id, account_name, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (16, 19, 'brother', '2024-11-18 12:34:06.488357', '2024-11-18 12:34:06.488357');


--
-- TOC entry 4844 (class 0 OID 35172)
-- Dependencies: 221
-- Data for Name: tbm_BadWords; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbm_BadWords" (word_id, word, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (3, 'fuck', '2024-11-16 15:42:44.174482', '2024-11-16 15:42:44.174482');
INSERT INTO public."tbm_BadWords" (word_id, word, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (1, 'wtf', '2024-11-16 15:35:03.215996', '2024-11-16 15:57:37.484786');


--
-- TOC entry 4842 (class 0 OID 35158)
-- Dependencies: 219
-- Data for Name: tbm_Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbm_Categories" (category_id, user_id, category_name, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (3, 19, 'shopping', '2024-11-15 22:49:02.877183', '2024-11-15 22:49:02.877183');


--
-- TOC entry 4850 (class 0 OID 35238)
-- Dependencies: 227
-- Data for Name: tbm_Sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (1, 32, 'ade2550b2eb273d1743e8a7922fb753efefe38cc86021f82cf13fc4927cc0af3', 'PC', '2024-11-17 09:01:36.806857', '2024-11-17 10:01:36.805');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (3, 19, '3592128f783b5d520f6f8d469e04db475ec31d4a945c0b49fbdf43fb38f11e05', 'Mobile', '2024-11-17 14:55:27.763027', '2024-11-17 15:55:27.762');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (4, 19, '263ba4019b3d625b37ffa81a7b500d72644528c8a2efe29c7dce20fd9dd47c09', 'Mobile', '2024-11-17 16:06:09.180315', '2024-11-17 17:06:09.179');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (5, 19, '146ae707e5ab29dd9d6616b0461c70ce1071e9c5e0de3363a687b8e326294c45', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-17 19:25:50.92198', '2024-11-17 20:25:50.92');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (13, 19, 'f4429456b6953f12445552446146f78b106eae67bd867d597677d91fa6be37dc', '5dc30a9bab3ebfe8d6e904285889e42021c17530ae96315bc2bceeb39b088233', '2024-11-17 20:05:21.391394', '2024-11-17 21:05:21.39');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (14, 19, '5bade1cc1f248272514ae693d93401d23d31bf8d562b6a81de76558d65715744', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-17 20:44:58.453063', '2024-11-17 21:44:58.452');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (15, 19, '101866cbb1aa9186e1c547658baa0f51fc1f16aca0a066eb4c79e8ac3d9f19f0', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-17 21:06:52.052336', '2024-11-17 22:06:52.051');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (16, 19, '56193ffa1416227f22b8761c997298aa:ddc54d3f1754a65c70d1895d4e272826', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-17 22:21:29.869516', '2024-11-17 23:21:29.868');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (17, 19, '6ff3a0a83e393edf3722b3dba5fb705b:a2f6362bda101257bb9b534260f4834c', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-17 22:22:31.601089', '2024-11-17 23:22:31.6');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (18, 19, 'eb13ff6eff90ed333b9a9af904584cd3:2511a4c74d8331dae3e15cb244870307', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-17 23:22:54.552833', '2024-11-18 00:22:54.552');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (19, 19, 'e63cebd243d9bc680b79a61c527837e0:c53b95c21703ebef0c3e967d2352ffb1', '7d0f2c9929f5492f20391beab48fbc563c9a13bfe93f01a1bf60be4f3be856b8', '2024-11-18 00:22:20.093438', '2024-11-18 01:22:20.092');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (20, 19, 'a4a4d5e859d7788599164d732b734416:cf96429de3f3845cb53df06fe63b6973', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-18 01:24:09.795456', '2024-11-18 02:24:09.795');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (21, 19, '0f4cd49bdee4d399e17741fcf7ca1aec:9d2aa3bc2c158b47dc5249c04be83983', '5dc30a9bab3ebfe8d6e904285889e42021c17530ae96315bc2bceeb39b088233', '2024-11-18 02:03:03.250349', '2024-11-18 03:03:03.249');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (22, 19, 'af562d4fbdcef17c44b2254c1d48231a:40bde364b63eb7d9ab41c2163d0c47ad', '7d0f2c9929f5492f20391beab48fbc563c9a13bfe93f01a1bf60be4f3be856b8', '2024-11-18 02:30:13.409552', '2024-11-18 03:30:13.408');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (23, 19, 'c38cbdc11fdb642ec2399468590f3f08:f29ff41f773a9cf5b10135b275df437f', '950e43a615cf2088cc2d7fe6333c0b549516e279fe5a5524515d7bec3a728d06', '2024-11-18 02:57:58.176716', '2024-11-18 03:57:58.175');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (24, 19, '276cb10a072c11483a1e5e1078d52915:8d4d3a05d706997453c7b584570d0fd1', '5dc30a9bab3ebfe8d6e904285889e42021c17530ae96315bc2bceeb39b088233', '2024-11-18 03:38:09.106481', '2024-11-18 04:38:09.105');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (25, 19, '8ec254398eb882fc0255aba1dc6e6fc4:77468bc27145a646704891433da7b280', '5dc30a9bab3ebfe8d6e904285889e42021c17530ae96315bc2bceeb39b088233', '2024-11-18 09:15:00.326621', '2024-11-18 10:15:00.325');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (26, 19, 'bcdbecc03caecd4d70dc0cadf9f20786:d5dc58479bf2d5ee31e238cf0b1294ca', '7d0f2c9929f5492f20391beab48fbc563c9a13bfe93f01a1bf60be4f3be856b8', '2024-11-18 10:02:44.093946', '2024-11-18 11:02:44.092');
INSERT INTO public."tbm_Sessions" (session_id, user_id, token, device_id, created_at, expires_at) OVERRIDING SYSTEM VALUE VALUES (27, 19, '55f15d3500313ed4c3a4ec14f1697e4a:e1434df7e9f934823242061c1e084dd5', '7d0f2c9929f5492f20391beab48fbc563c9a13bfe93f01a1bf60be4f3be856b8', '2024-11-18 12:21:27.782265', '2024-11-18 13:21:27.781');


--
-- TOC entry 4840 (class 0 OID 35144)
-- Dependencies: 217
-- Data for Name: tbm_Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbm_Users" (user_id, username, password, email, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (19, 'user11', '$2b$10$QbOcqdBZY2auO6RonxrwRuyTgAoWO90wtxyug8l9CqU3Hl78WVYN2', 'chawbanthinn@gmail.com', '2024-11-14 22:43:42.239243', '2024-11-14 22:43:42.239243');
INSERT INTO public."tbm_Users" (user_id, username, password, email, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (8, 'user111', '$2b$10$4zkPZ0BPSedrofdH39C.KOW2a5ZEfCy5xpXO/lBkqon5fSz3oCZqq', 'test@hotmail.com', '2024-11-14 22:24:55.305814', '2024-11-15 13:49:32.499947');
INSERT INTO public."tbm_Users" (user_id, username, password, email, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (32, 'user112', '$2b$10$oDNETEFAMpxrMLYEnxTdD.DppVLWmCCLtbWtgBXBpHRY2TBIsTWxq', 'test1@hotmail.com', '2024-11-15 15:45:21.953728', '2024-11-15 15:45:21.953728');
INSERT INTO public."tbm_Users" (user_id, username, password, email, created_at, updated_at) OVERRIDING SYSTEM VALUE VALUES (34, 'user13', '$2b$10$dwUJpFTXz2K72RHLbUoSguzvMjzr2ccj0ARA7VlL9LEyXbXPqTMPO', 'user13@gmail.com', '2024-11-18 02:16:19.307862', '2024-11-18 02:16:19.307862');


--
-- TOC entry 4843 (class 0 OID 35165)
-- Dependencies: 220
-- Data for Name: tbs_Transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (10, 19, 8, 3, 1, '2024-11-15', 'test-comment ***', 'https://res.cloudinary.com/daxhrxeux/image/upload/v1731765935/Expense/cxcfsu88khj1tydr096v.jpg', '2024-11-16 21:05:35.320771', '2024-11-16 21:05:35.320771', 'income', 'Expense/cxcfsu88khj1tydr096v');
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (12, 19, 8, 3, 100, '2024-11-15', 'test-comment ***', 'https://res.cloudinary.com/daxhrxeux/image/upload/v1731852503/Expense/a9sbppffjbvwcvpqgq9h.jpg', '2024-11-17 21:08:22.337551', '2024-11-17 21:08:22.337551', 'income', 'Expense/a9sbppffjbvwcvpqgq9h');
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (13, 19, 8, 3, 100, '2024-11-15', 'test-comment ***', NULL, '2024-11-17 22:50:53.502144', '2024-11-17 22:50:53.502144', 'income', NULL);
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (14, 19, 8, 3, 100, '2024-11-15', 'test-comment ***', 'https://res.cloudinary.com/daxhrxeux/image/upload/v1731859906/Expense/hqei89meh7qci31w9pon.jpg', '2024-11-17 22:52:25.007361', '2024-11-17 22:52:25.007361', 'income', 'Expense/hqei89meh7qci31w9pon');
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (15, 19, 8, 3, 200, '2024-11-15', 'test-comment ***', 'https://res.cloudinary.com/daxhrxeux/image/upload/v1731860769/Expense/thqumug6prijfmta0svl.jpg', '2024-11-17 23:26:07.254966', '2024-11-17 23:26:07.254966', 'income', 'Expense/thqumug6prijfmta0svl');
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (16, 19, 8, 3, 400, '2024-11-15', 'test-comment ***', NULL, '2024-11-17 23:33:39.990797', '2024-11-17 23:56:33.802629', 'income', NULL);
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (17, 19, 15, 3, 500, '2024-11-18', '***', 'https://res.cloudinary.com/daxhrxeux/image/upload/v1731872958/Expense/yq9aw6yqaxfinkbn3jic.jpg', '2024-11-18 02:49:16.173622', '2024-11-18 02:49:16.173622', 'expense', 'Expense/yq9aw6yqaxfinkbn3jic');
INSERT INTO public."tbs_Transactions" (transaction_id, user_id, account_id, category_id, amount, date, comment, slip_image_url, created_at, updated_at, transaction_type, cdn_public_id) OVERRIDING SYSTEM VALUE VALUES (11, 19, 8, 3, 123, '2024-11-15', 'test-comment ***', 'https://res.cloudinary.com/daxhrxeux/image/upload/v1731852432/Expense/nfonrfqxa1hnugj0oa7e.jpg', '2024-11-17 21:07:10.665969', '2024-11-18 03:59:15.989513', 'income', 'Expense/nfonrfqxa1hnugj0oa7e');


--
-- TOC entry 4858 (class 0 OID 0)
-- Dependencies: 223
-- Name: tbm_Accounts_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbm_Accounts_account_id_seq"', 16, true);


--
-- TOC entry 4859 (class 0 OID 0)
-- Dependencies: 226
-- Name: tbm_BadWords_word_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbm_BadWords_word_id_seq"', 3, true);


--
-- TOC entry 4860 (class 0 OID 0)
-- Dependencies: 224
-- Name: tbm_Categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbm_Categories_category_id_seq"', 3, true);


--
-- TOC entry 4861 (class 0 OID 0)
-- Dependencies: 228
-- Name: tbm_Sessions_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbm_Sessions_session_id_seq"', 27, true);


--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 222
-- Name: tbm_Users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbm_Users_user_id_seq"', 41, true);


--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 225
-- Name: tbs_Transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tbs_Transactions_transaction_id_seq"', 17, true);


--
-- TOC entry 4683 (class 2606 OID 35178)
-- Name: tbm_BadWords BadWords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_BadWords"
    ADD CONSTRAINT "BadWords_pkey" PRIMARY KEY (word_id);


--
-- TOC entry 4673 (class 2606 OID 35157)
-- Name: tbm_Accounts tbm_Accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Accounts"
    ADD CONSTRAINT "tbm_Accounts_pkey" PRIMARY KEY (account_id);


--
-- TOC entry 4677 (class 2606 OID 35164)
-- Name: tbm_Categories tbm_Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Categories"
    ADD CONSTRAINT "tbm_Categories_pkey" PRIMARY KEY (category_id);


--
-- TOC entry 4688 (class 2606 OID 35242)
-- Name: tbm_Sessions tbm_Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Sessions"
    ADD CONSTRAINT "tbm_Sessions_pkey" PRIMARY KEY (session_id);


--
-- TOC entry 4667 (class 2606 OID 35150)
-- Name: tbm_Users tbm_Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Users"
    ADD CONSTRAINT "tbm_Users_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 4681 (class 2606 OID 35171)
-- Name: tbs_Transactions tbs_Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbs_Transactions"
    ADD CONSTRAINT "tbs_Transactions_pkey" PRIMARY KEY (transaction_id);


--
-- TOC entry 4675 (class 2606 OID 35216)
-- Name: tbm_Accounts unique_account_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Accounts"
    ADD CONSTRAINT unique_account_name UNIQUE (account_name);


--
-- TOC entry 4685 (class 2606 OID 35224)
-- Name: tbm_BadWords unique_bad_word; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_BadWords"
    ADD CONSTRAINT unique_bad_word UNIQUE (word);


--
-- TOC entry 4679 (class 2606 OID 35219)
-- Name: tbm_Categories unique_category_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Categories"
    ADD CONSTRAINT unique_category_name UNIQUE (category_name);


--
-- TOC entry 4669 (class 2606 OID 35214)
-- Name: tbm_Users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Users"
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 4671 (class 2606 OID 35212)
-- Name: tbm_Users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Users"
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 4686 (class 1259 OID 35252)
-- Name: fki_sessionUser; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_sessionUser" ON public."tbm_Sessions" USING btree (user_id);


--
-- TOC entry 4691 (class 2606 OID 35194)
-- Name: tbs_Transactions accountTransaction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbs_Transactions"
    ADD CONSTRAINT "accountTransaction" FOREIGN KEY (account_id) REFERENCES public."tbm_Accounts"(account_id);


--
-- TOC entry 4692 (class 2606 OID 35199)
-- Name: tbs_Transactions categoryTransaction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbs_Transactions"
    ADD CONSTRAINT "categoryTransaction" FOREIGN KEY (category_id) REFERENCES public."tbm_Categories"(category_id);


--
-- TOC entry 4694 (class 2606 OID 35247)
-- Name: tbm_Sessions sessionUser; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Sessions"
    ADD CONSTRAINT "sessionUser" FOREIGN KEY (user_id) REFERENCES public."tbm_Users"(user_id);


--
-- TOC entry 4689 (class 2606 OID 35179)
-- Name: tbm_Accounts userAccount; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Accounts"
    ADD CONSTRAINT "userAccount" FOREIGN KEY (user_id) REFERENCES public."tbm_Users"(user_id);


--
-- TOC entry 4690 (class 2606 OID 35184)
-- Name: tbm_Categories userCategory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbm_Categories"
    ADD CONSTRAINT "userCategory" FOREIGN KEY (user_id) REFERENCES public."tbm_Users"(user_id);


--
-- TOC entry 4693 (class 2606 OID 35189)
-- Name: tbs_Transactions userTransaction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tbs_Transactions"
    ADD CONSTRAINT "userTransaction" FOREIGN KEY (user_id) REFERENCES public."tbm_Users"(user_id);


-- Completed on 2024-11-18 13:49:18

--
-- PostgreSQL database dump complete
--

