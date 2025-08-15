--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-08-12 03:54:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16453)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO aimap_user;

--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: data_collection_details; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.data_collection_details (
    id uuid NOT NULL,
    method_id uuid NOT NULL,
    field_name character varying NOT NULL,
    value text NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE public.data_collection_details OWNER TO aimap_user;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: data_collection_methods; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.data_collection_methods (
    id uuid NOT NULL,
    name character varying NOT NULL,
    description text,
    stage character varying,
    created_at timestamp without time zone
);


ALTER TABLE public.data_collection_methods OWNER TO aimap_user;

--
-- TOC entry 220 (class 1259 OID 16537)
-- Name: method_actor_association; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.method_actor_association (
    method_id character varying NOT NULL,
    actor_id character varying NOT NULL
);


ALTER TABLE public.method_actor_association OWNER TO aimap_user;

--
-- TOC entry 224 (class 1259 OID 16582)
-- Name: pipeline_details; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.pipeline_details (
    id character varying NOT NULL,
    method_id character varying NOT NULL,
    name character varying NOT NULL,
    value character varying NOT NULL,
    description character varying,
    file_path character varying,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.pipeline_details OWNER TO aimap_user;

--
-- TOC entry 223 (class 1259 OID 16570)
-- Name: pipeline_methods; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.pipeline_methods (
    id character varying NOT NULL,
    stage_id character varying NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.pipeline_methods OWNER TO aimap_user;

--
-- TOC entry 221 (class 1259 OID 16554)
-- Name: pipeline_stages; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.pipeline_stages (
    id character varying NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.pipeline_stages OWNER TO aimap_user;

--
-- TOC entry 222 (class 1259 OID 16563)
-- Name: responsible_actors; Type: TABLE; Schema: public; Owner: aimap_user
--

CREATE TABLE public.responsible_actors (
    id character varying NOT NULL,
    name character varying NOT NULL,
    role character varying NOT NULL,
    contributions character varying,
    decisions character varying,
    reasons character varying,
    "timestamp" timestamp without time zone
);


ALTER TABLE public.responsible_actors OWNER TO aimap_user;

--
-- TOC entry 4937 (class 0 OID 16453)
-- Dependencies: 219
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.alembic_version (version_num) FROM stdin;
\.


--
-- TOC entry 4936 (class 0 OID 16396)
-- Dependencies: 218
-- Data for Name: data_collection_details; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.data_collection_details (id, method_id, field_name, value, created_at) FROM stdin;
\.


--
-- TOC entry 4935 (class 0 OID 16389)
-- Dependencies: 217
-- Data for Name: data_collection_methods; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.data_collection_methods (id, name, description, stage, created_at) FROM stdin;
292eba02-4b62-41ec-af11-4fbe97203052	Survey	Collect data via surveys	DATA COLLECTION	2024-05-07 12:00:00
4f559ae9-657f-45cf-8cb2-79157d0974ee	Survey	Collect data via surveys	Planning	2024-05-07 12:00:00
219aeca0-d1f7-4d52-ba04-73b2bfc7b55a	Survey	Collect data via third party	Planning	2024-05-07 12:00:00
224b7099-6d63-4c97-82f6-7cd26a2f70f7	Survey	Collect data via sensors	Planning	2024-05-07 12:00:00
\.


--
-- TOC entry 4938 (class 0 OID 16537)
-- Dependencies: 220
-- Data for Name: method_actor_association; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.method_actor_association (method_id, actor_id) FROM stdin;
291ddea5-a281-4ea5-ae38-1ce73c162169	920c1558-b32c-4c36-8267-48fa8ef61a75
24a5ac2a-1ec9-40c5-aae4-2afa58392241	6b1b91d8-4213-4cad-84cd-3f25868914fb
46957d94-47fc-4afd-86f8-a923dc03df93	6b1b91d8-4213-4cad-84cd-3f25868914fb
6d9f7696-913e-41be-9da7-512f33ed2039	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
6e82eaef-e229-48df-9f5a-d2e68c8b092f	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
d8d05c5d-7fa3-41e7-848e-a3abbd7b5990	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
ca97ab9a-8a40-4d1a-828f-4d500113676c	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
d563da1a-3e89-4fc4-ab82-c31b31c996a0	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
80e9bb72-84a7-48ea-bf8c-1d529b281898	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
95d84119-b10a-472e-9bd0-a40cd5078b14	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
95d84119-b10a-472e-9bd0-a40cd5078b14	e4831b98-f517-490e-add3-1f236674cca7
1625bb8d-3230-46bf-8184-e01a4dd74850	e4831b98-f517-490e-add3-1f236674cca7
1625bb8d-3230-46bf-8184-e01a4dd74850	39f4be63-4df9-4feb-b9f5-c6ada41cb01c
00e489f9-df62-47b8-9a5b-beb35c204c86	f868cb87-8e18-439c-b1ff-b9ecc3fb8386
\.


--
-- TOC entry 4942 (class 0 OID 16582)
-- Dependencies: 224
-- Data for Name: pipeline_details; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.pipeline_details (id, method_id, name, value, description, file_path, "timestamp") FROM stdin;
7c090df3-cf59-4d28-9eb1-daf16ec0b3ed	24a5ac2a-1ec9-40c5-aae4-2afa58392241	Location	0	According to the publisher, dataset were collected from different regions across China, including North, Central and North West using SCADA systems. Since they did not provide a specific location or city, we searched for the similar weather pattern in the three mentioned regions after analysing the dataset (seasonal trend visualized below). We found a published report by China Metrological Administrion in 2021 and Springer Nature 2023 describing similar event, our finding suggest that Central china region had similar climate patterns between 2019 and 2020 period that we see in the dataset. 	uploads\\a8ac345d-60b3-4396-992a-a815d42b6164_seasonalTrend.png	2025-07-06 22:11:59.322929
59e936e3-943b-4455-b634-1269c4a85a8b	24a5ac2a-1ec9-40c5-aae4-2afa58392241	Licence 	0	Dataset were published on Springer Nature as OpenAccess (OA) and Licenced under Creative Commons Licence. Found at: https://www.nature.com/articles/s41597-022-01696-6	\N	2025-07-06 22:18:36.412515
3e2b3665-5a72-4047-bf22-b4e426ee2aba	46957d94-47fc-4afd-86f8-a923dc03df93	Metadata 	0 	Publication: Data was published on September 21, 2022 by Yongbao Chen and Junjie Xu on Springer Nature. \r\n\r\nDescription: The dataset consist of variables combining both weather data and power generation data. Variables includes TSI - Total solar irradiance (W/m2), DNI - Direct normal irradiance (W/m2), GHI - Global horizontal irradiance (W/m2), Air_T - Air temperature (°C), Air_P - Atmosphere (hpa), Air_H - Relative humidity (%) and Power (MW). \r\n\r\nTimeline: 31.12.2018-31.12.2020 on 15 minutes interval. 	\N	2025-07-06 22:36:21.482242
2f3ff10a-3466-4ae8-befe-ab79e4da53ea	46957d94-47fc-4afd-86f8-a923dc03df93	Technical setup	0	Data collection setup is attached below as collected from the publisher.	uploads\\acfb507b-1a68-4eb1-8691-4d2ea2cfe00b_Data Collection Approach..webp	2025-07-06 22:38:19.266218
03ffefbc-343c-451c-ac93-22a44f004977	6d9f7696-913e-41be-9da7-512f33ed2039	State of missing values 	0	After loading the dataset we first checked the missing/null values in each variable. The result is shown in the image below. 	uploads\\5873dd5a-9754-414a-a89f-14d192832cc9_missing values.png	2025-07-07 00:28:42.693133
b95da057-dc5d-4452-8efc-81ebe1554a58	6d9f7696-913e-41be-9da7-512f33ed2039	M2 - KNN Imputation	5	Since we used the same dataset, the amount of missing values in M1 and M2 are the same, here we used kNN imputation setting the nearest neighbour = 5. 	uploads\\f2c282a5-0a67-4eae-b0b7-f5a12f7b90e3_M2 after imputation of missing values.png	2025-07-13 02:17:38.703124
81a00acb-3d06-4e24-9e4d-8877abaa6487	6e82eaef-e229-48df-9f5a-d2e68c8b092f	M1 - Outliers found	388	At this satge we applied z-score at 3 threshold, we found 388 outliers mostly in Air_P with large skewed data points, TSI and DNI with minor skewing. The image below shows the boxplot showing the outliers in the data (variables).	uploads\\0ac73347-3a41-40a4-b6ec-b0bec0243b5a_outlier state.png	2025-07-08 18:48:46.492284
50050833-469c-4d62-994f-131d5b8046e6	6d9f7696-913e-41be-9da7-512f33ed2039	M1 - Linear Interpolation	0	We then applied linear interpolation for the statistical driven preprocessing approach. The image below show 0 missing values after the inputation.	uploads\\c726fe8f-3595-4f3a-803b-cb6f9b287170_after applying linear interpolation.png	2025-07-07 00:32:20.308995
78e3d683-2541-4d6c-9e7d-c9bf63ae834b	6e82eaef-e229-48df-9f5a-d2e68c8b092f	M1 - Outlier (Mean) Imputation	3	At this stage, all outliers beyond the threshold 3, a mean imputation method was applied. Some datapoints may still be seen outside the threshold in the boxplot because the imputed datapoints are closer to the threshold in distance and therefore very rare to cross the threshold. We applied this threshold because some rare weather conditions maybe recoded due climate change. 	uploads\\ece5b8a3-2d58-4bc4-9f92-f75a5aad1619_after zscore application.png	2025-07-08 19:08:57.860763
f7337f61-b27a-497b-a0c0-c3926f51d996	d8d05c5d-7fa3-41e7-848e-a3abbd7b5990	Data before Normalization	-1,1	Before we applied the normalization method, the data set looks as follows. 	uploads\\4cddebe5-4828-481f-9598-e05f0f6ccfe0_before MinMax.png	2025-07-08 20:28:30.140194
14bfb8ec-05de-4fec-a61e-25648843f610	d8d05c5d-7fa3-41e7-848e-a3abbd7b5990	M1 - after MinMax	-1,1	Normalization after applying MinMax [-1,1] method. 	uploads\\33aca5ae-ea25-4409-8199-be2ffeb48e0e_after MinMax.png	2025-07-08 20:30:19.12622
09e0ede2-f98d-4910-8847-73c575df8e25	ca97ab9a-8a40-4d1a-828f-4d500113676c	M1 - Temporal attributes	-	We used a basic approach to extract them from time variable (i.e. timestamp datatype). The effect is demonstrated in image below. 	uploads\\93768fc2-fe26-40f1-8134-c69dec468cc0_temporal attributes.png	2025-07-08 20:46:25.410077
16afa66c-1490-458b-9e5a-d73964c32063	ca97ab9a-8a40-4d1a-828f-4d500113676c	M1 - Feature selection PCC	-	Here we used Pearson Correlation Coefficient (PCC) method to compute the correlation among variables. However, we only used the primary variables (excluded newly added temporal features) for simplicity of visualization using heatmap method. 	uploads\\e785a81c-ba0d-43b0-81c9-c174938aeb29_Heatmap.png	2025-07-08 20:55:05.444983
32248560-b111-4d19-873e-c0815031046a	80e9bb72-84a7-48ea-bf8c-1d529b281898	M1 - Simulation Test (MSE)	0.02	We simulated a sudden drop of solar irradiance, the MSE error rate stood at 0.02 i.e. which indicates small amount of prediction error.  The image belows is the demonstratation of the result. 	uploads\\5304dbe2-69f0-4b52-8beb-f7de9fba906f_simulated drop.png	2025-07-08 21:58:27.626016
6c21f351-0eae-4565-b412-74f2d08d1761	80e9bb72-84a7-48ea-bf8c-1d529b281898	M1 - Significant errors (in Simulation)	5	We also had an interest to see amount of signiface errors that can be possible above 0.5MW threshold of predicted power in the simulation test, we can learn that there was only 5 siginicant errors which are also decreasing when crossing the threshold of 0.5MW as demonstrated in the plot below: 	uploads\\15e32579-369e-40af-8f0b-c5c0fa6ed615_significantErrors.png	2025-07-08 22:11:12.238844
7673125e-565a-4ac8-bcbd-357fa71ef818	80e9bb72-84a7-48ea-bf8c-1d529b281898	M1 - Day/Night Performance	-	The model also learned the differnce of day and night hours as demonstrate in the simulation test image.	\N	2025-07-08 22:12:55.595307
40709cf0-6d9e-4210-8c71-7343d9fb71f2	6e82eaef-e229-48df-9f5a-d2e68c8b092f	M2 outliers	0	Since we applied method KNN in missing values for M2, outliers of may differ from M1, this is why we have to demonstrate the state of outliers in M2. Outliers can be visible in red mostly in TSI, GHI, and DNI. While Air_P outliers remains scattered just like in M1. 	uploads\\47cb99ec-8ff9-4922-9b0f-ff4ef28755d1_M2 outliers.png	2025-07-13 02:55:57.459789
d0e9d00a-de0c-461b-a985-f1c6f4a43511	d8d05c5d-7fa3-41e7-848e-a3abbd7b5990	M2 - after RobustScaler + z-score	-3/3	In M2, we applied robustScaler method + z-score normalization with -3,3 scaling. The image below shows the values in the dataset after methods were applied.	uploads\\c5aad4de-e57d-44f1-8e81-370af0ad2828_M2 After robust scaler.png	2025-07-13 03:08:10.264474
a8c0a4f2-b177-4917-a7c2-a8c8897303c8	80e9bb72-84a7-48ea-bf8c-1d529b281898	M2 - Simulation Test MSE/RMSE	0	Test MSE under simulated drop: 0.008214121112589321, and \r\nTest RMSE under simulated drop: 0.09063178864277877	\N	2025-07-13 03:37:16.491169
9a344d56-0a92-49c4-aee9-fa9defefa608	80e9bb72-84a7-48ea-bf8c-1d529b281898	M2 - Day/Night Performance	0	M2 performs the worst in this case, possible issue may stem from the training parameters, normalization or imputation.  	uploads\\16c68b81-e771-41be-a4fb-9fa4eeefe2c0_M2 day and Night.png	2025-07-13 03:48:48.829341
a452da25-f1c8-41ba-9dd5-7996a776b13a	6e82eaef-e229-48df-9f5a-d2e68c8b092f	M2 - kNN + IQR	0	After applying outliers handling methods i.e. IQR + KNN Imputation, we can see how the data points that were outliers are now fitting closer or deep into the normal datapoints. 	uploads\\b7b4dfc7-1cea-447f-b857-442dbe079f9e_M2 after outliers knn fit transform imputation.png	2025-07-13 03:00:25.776703
1ca0d68e-a6fd-4692-816d-6d6bd5ac7450	ca97ab9a-8a40-4d1a-828f-4d500113676c	M2 - Fit Transform + Temporal Feature	0	Here we used both fit transform and temporal features method for feature engineering before model training. 	uploads\\bf6683f0-89d9-479d-9625-7c499b6c08dd_M2 feature engr with fit transform.png	2025-07-13 03:14:46.09894
d94554ee-496e-408e-af09-833ae6b4a9fa	d563da1a-3e89-4fc4-ab82-c31b31c996a0	M2 - Model Performance Metrics 	0	Test MSE: 1.6307037276212795,\r\nTest RMSE: 1.2769901047468142,\r\nTest MAE: 0.6793835749682372, and\r\nTest R-squared: 0.9803265751196784	uploads\\b63c43ae-8210-43de-b276-62d64547940c_M2 Model metrics.png	2025-07-13 03:17:53.079808
4176acb9-e1c9-4607-8a8a-e136130a2c25	d563da1a-3e89-4fc4-ab82-c31b31c996a0	M1 - Model Performance Metrics 	0	Test MSE: 0.005963700149509651, Test RMSE: 0.07722499692139619, Test MAE: 0.03485453576566984, and Test R-squared: 0.9824457303268427	uploads\\b47b6e80-55a7-40f6-819c-5fdd5e932b72_GenModelPerformance.png	2025-07-08 21:47:53.325517
7b5ca491-42bb-4519-a1aa-2ac4750140ff	d563da1a-3e89-4fc4-ab82-c31b31c996a0	M1 - Hyperparameters 	0	LSTM Neurons\t100,\tWith 70k+ samples, 100 neurons provide enough capacity to learn complex time dependencies without overfitting. It balances representational power and training efficiency, especially when forecasting nonlinear patterns between weather and energy generation.\r\nLearning Rate\t0.001,\tThis is a widely stable default for Adam optimizer. It’s small enough to ensure steady convergence without bouncing around minima, yet fast enough to train a moderately sized network within a reasonable epoch count.\r\nNumber of Layers\t2,\tStacking two LSTM layers allows the first to learn immediate trends (e.g., hourly fluctuations) and the second to abstract longer-term patterns (e.g., daily or multi-day cycles). This deepens the temporal sensitivity.\r\nBatch Size\t32,\tA batch size of 32 is memory-efficient and supports fast, stable convergence. It gives the model frequent weight updates, helpful with datasets under 100k rows like yours.\r\nDropout Rate\t0.3,\tDropout at 30% offers effective regularization for deep sequence models. It prevents overfitting on repeating weather cycles while keeping enough capacity to learn valuable relationships.\r\nTime Steps\t48,\tEach sample uses 48 time steps (e.g., 2 days of hourly data), giving the model enough history to detect lags, trends, and temporal interactions, such as cumulative cloudiness or lagged solar responses.\r\nEpochs\t20,\tWith your dataset size and the chosen network depth, 20 epochs is a solid starter. It’s long enough for convergence, especially when combined with early stopping, without overfitting.\r\nOptimizer\tAdam,\tAdam combines momentum and adaptive learning rates—ideal for noisy or multi-variate time series. It handles sparse gradients well and often outperforms SGD in regression tasks.\r\nActivation Function\ttanh,\ttanh squashes inputs into [-1, 1], which pairs well with MinMax-scaled features. It stabilizes recurrent states in LSTM units, preserving gradients and memory over long sequences.\r\nLoss Functions\tMSE, RMSE, MAE, and R²,\tThese give a well-rounded view of model performance. MSE penalizes large errors, RMSE gives unit-scale feedback, MAE is more robust to outliers, and R² shows how well variance is captured.	uploads\\5537a549-c535-49b2-9f00-403f37dfdde8_M1 Hyperparams.png	2025-07-13 03:27:57.741284
525b7010-4370-45e0-b1ce-682345691944	d563da1a-3e89-4fc4-ab82-c31b31c996a0	M2 - Hyperparameters	0	SEQ_LENGTH\t48,\tYou’re feeding the model 48 time steps—likely 2 days of hourly data—which gives it enough historical context to learn short-term patterns and delayed effects (like irradiance influencing power output later).\r\nNUM_LSTM_NEURONS\t200,\tDoubling the neurons from 100 to 200 increases the model’s capacity to learn complex and nonlinear relationships. This is useful since you're modeling multiple interacting variables with noisy fluctuations.\r\nLEARNING_RATE\t0.01,\tA slightly aggressive rate that can speed up learning in early epochs. Works best when paired with adaptive optimizers like Adam, though you should watch for volatility—might benefit from scheduling or warmup.\r\nNUM_LAYERS\t3,\tAdding a third layer makes the model deeper and more expressive. Each layer can learn progressively abstract representations (e.g., local weather effects vs seasonal trends). Useful if generalization is your goal.\r\nBATCH_SIZE\t128,\tA large batch size speeds up training and smooths gradient updates. With 70k rows, it lets you process data efficiently. You might lose a tiny bit of nuance, but gain speed and stability.\r\nDROPOUT_RATE\t0.2,\tA moderate dropout rate (20%) guards against overfitting while allowing the larger network to retain enough structure for learning. Especially important with 3 layers and 200 neurons.\r\nEPOCHS\t50,\tMore epochs give the model time to learn finer-grained patterns—like cyclical weather behavior and sudden demand changes. This makes sense given your increased capacity and batch size. Just monitor for overfitting.\r\nOPTIMIZER\tAdam with lr=0.01,\tAdam adjusts learning rates dynamically per parameter, which helps balance the faster base rate. It’s resilient to noisy gradients from power or weather inputs and widely effective for time series.\r\nACTIVATION_FUNCTION\t'tanh',\tPerfect match for LSTM units. It squashes outputs between -1 and 1, stabilizing the network and aligning with MinMax-scaled inputs. Ideal for models processing cyclic data like temperature and solar. Loss Functions\tMSE, RMSE, MAE, and R²,\tThese give a well-rounded view of model performance. MSE penalizes large errors, RMSE gives unit-scale feedback, MAE is more robust to outliers, and R² shows how well variance is captured.	uploads\\4d2453ea-d34d-4a49-9836-36fb7e09f0d3_M2 hyperparam.png	2025-07-13 03:33:47.963182
7fe1f966-8151-42e6-98a9-a3342fe679ce	80e9bb72-84a7-48ea-bf8c-1d529b281898	M2 - Significant errors (in prediction) 	35	Number of significant prediction errors (above 0.5 MW) is 35, this is larger than M1 which has only 5.	uploads\\8116b257-154a-4c81-b5e6-c9b9ae02b663_M2 Significant errors in prediction.png	2025-07-13 03:46:46.801333
f637a966-cdc7-48b3-9b5b-c31e6178b9a5	1625bb8d-3230-46bf-8184-e01a4dd74850	Prediction Logs	0	Here we can download prediction log with dataset fed into the model for prediction after every 2 hours.	\N	2025-07-13 03:59:42.14883
a63aa658-2563-48bd-9f2b-42668924146b	00e489f9-df62-47b8-9a5b-beb35c204c86	Data before preparation	0	The image below shows the encoding of the collected dataset befor preparation. We can see that all datatypes were object, we also see semicolon (;) which indicate that the dataset were in dsv encoding. And lastly the names of the columns are very long with an empty column. 	uploads\\f2fb61c0-773c-47a0-8c9e-c20844dac9f5_Data before preparation.png	2025-07-13 15:13:13.701021
525061dc-f72f-4eba-b845-4bcfe171f619	95d84119-b10a-472e-9bd0-a40cd5078b14	Requirement 	0	Here we mention technical requirements for deploying the model.	\N	2025-07-13 04:01:41.109506
740674d3-1665-42fe-aae7-ef7cba52e78f	24a5ac2a-1ec9-40c5-aae4-2afa58392241	Dataset	0	Attached is the row dataset in .csv format used for training the model. Mode details about the variables in the dataset are as follows: \r\nFeature\t- Description\r\nTSI - Total solar irradiance (W/m2): This is the total amount of solar energy received per unit area at the top of the Earth’s atmosphere. It includes all wavelengths of solar radiation.\r\nDNI - Direct normal irradiance (W/m2): This measures the amount of solar radiation received per unit area by a surface that is always held vertically (or normal) to the sun’s rays. It’s important for concentrating solar power systems.\r\nGHI - Global horizontal irradiance (W/m2): This is the total amount of solar radiation received per unit area by a horizontal surface. It includes both direct sunlight and diffuse sky radiation (i.e. sunlight scattered by the atmosphere). On cloudy or hazy days, diffuse radiation can increase, boosting GHI even when direct sunlight (DNI) is low.\r\nAir_T - Air temperature (°C): Air temperature is simply how hot or cold the air is, measured in degrees Celsius (°C). \r\nAir_P - Atmosphere (hpa): This is the weight of the air above. It’s measured in hectopascals (hPa). 1.5 meters above the ground.\r\nAir_H - Relative humidity (%)  \tThis tells how much moisture is in the air compared to the maximum amount of moisture the air can hold at that temperature. \r\nPower (MW): Total Power generated.\r\n	uploads\\92fc135a-6dca-4c78-974e-bbcb5459efa0_StationDataset.csv	2025-07-13 14:59:26.053234
aa2f6add-f930-4223-8b90-3762ddc260e2	00e489f9-df62-47b8-9a5b-beb35c204c86	Data after preparation 	0	The image below shows the state of the dataset after applying preparatory measures including, enabling python to read it as dsv, converting numerical columns' datatypes from object to float64 and time variable to datetime, dropping empty column, and renaming (shortening) the columns to allow us see evey column with clarity. 	uploads\\defacb82-0f20-4f12-8d92-498d30fb8cbe_data after preparation .png	2025-07-13 15:21:27.126746
039c5184-a874-4858-bf1d-1e6a63224f22	95d84119-b10a-472e-9bd0-a40cd5078b14	M1 - Model Provenance 	0	M1 Provenance data collected using MLProvLab. This shows the dependencies required for the model deployment 	uploads\\8fb321b9-6403-4331-a3ba-93434638024e_M1 Provenance Execution Dependencies.png	2025-07-13 15:32:42.560789
59b57370-1bb4-458f-a61e-751b17aea95e	80e9bb72-84a7-48ea-bf8c-1d529b281898	M1 - SHAP result	0	M1 demonstrates logically coherent behavior for solar forecasting. The plot shows a clear hierarchy: recent irradiance measurements (TSI_t41 to TSI_t47) dominate predictions with strong positive SHAP values (>0.2), meaning higher irradiance reliably increases forecasted PV output. Secondary features like hour-of-day follow expected solar patterns e.g. daytime hours positively impact generation while nighttime values suppress predictions. This alignment with physical principles confirms M1’s decision-making is interpretable and grounded in real-world solar dynamics. 	uploads\\20b97bfd-c580-4a67-ba9b-ba1b88eb6a03_M1 SHAP result.png	2025-07-13 15:35:45.289986
c80d22ca-5bc7-4dfe-9c00-f6671ff9c266	80e9bb72-84a7-48ea-bf8c-1d529b281898	M2 - SHAP result	0	M2’s SHAP results reveal more fragmented reasoning. While it nominally identifies similar key features (TSI_t47, GHI_t47), their influence is weaker (max 0.125 SHAP value) and less consistent. The plot shows contradictory impacts where some timesteps exhibit both positive and negative SHAP values for identical feature ranges (e.g., high irradiance sometimes increases while other times decreases predictions). This suggests M2’s AI-driven preprocessing, while theoretically more sophisticated, inadvertently obscures the clear irradiance-to-output relationship that M1 preserves. The model compensates by distributing attention across more timesteps (11 vs. M1’s focused 10), but with less physically explainable patterns. 	uploads\\438a0fa1-33a7-4b9b-a822-dae63d4ff71b_M2 SHAP analysis.png	2025-07-13 15:36:40.014707
4a5d8d50-c2d7-482b-bb42-87c0d44259da	d8d05c5d-7fa3-41e7-848e-a3abbd7b5990	M2 - Reduced Normalization Scale	-2,2	The values of robust scaler have been reduced to -2,2 from the initial -3,3. The image below show the new values applied in the code and the output. However this has now affected the model performance as well.	uploads\\9438e202-4dcd-4eac-9720-f0f09f1ebc99_newRobustScale.png	2025-07-20 22:14:59.3897
e1c398a4-60c6-4ae3-b480-c4951982aba8	80e9bb72-84a7-48ea-bf8c-1d529b281898	M2 - Result after changing scale	-	The simulation test result after reducing normalization robust sacler from -3,3 to -2,2 have changed as follows: \r\nTest MSE under simulated drop: 0.02552094324162821\r\nTest RMSE under simulated drop: 0.15975275660103086 \r\nNumber of significant prediction errors (above 0.5 MW): 96	uploads\\1c71e344-7b92-47d7-8803-33d6769845be_M2 after changing scale.png	2025-07-20 22:34:42.88401
\.


--
-- TOC entry 4941 (class 0 OID 16570)
-- Dependencies: 223
-- Data for Name: pipeline_methods; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.pipeline_methods (id, stage_id, name, description, "timestamp") FROM stdin;
24a5ac2a-1ec9-40c5-aae4-2afa58392241	4447d945-0081-43f6-8e22-ac6f5c6fac02	Training data collection	Here we enter details about the training data. 	2025-07-05 23:15:46.132138
46957d94-47fc-4afd-86f8-a923dc03df93	4447d945-0081-43f6-8e22-ac6f5c6fac02	Collection Technique 	According to publisher, data were collected via Supervisory Control and Data Acquisition System (SCADA System).	2025-07-06 22:21:26.167962
6d9f7696-913e-41be-9da7-512f33ed2039	0f9c5202-dcd9-4678-8537-316b8d77ca97	Missing values	At this stage, we check if there are missing values and replace them with a statistical method. 	2025-07-07 00:14:33.105414
6e82eaef-e229-48df-9f5a-d2e68c8b092f	0f9c5202-dcd9-4678-8537-316b8d77ca97	Outliers (z-score)	At this stage, we applied z-score method with threshold 3/-3, to avoid trimming legitimate variability based on the distribution of the data. 	2025-07-08 18:39:12.278349
d8d05c5d-7fa3-41e7-848e-a3abbd7b5990	0f9c5202-dcd9-4678-8537-316b8d77ca97	Normalization	At this stage, we applied MinMax [-1,1] scaling method for normalizing the data. The reason for this choice is in line with chosen model for the task. Activation functions works well with method especially for the dataset and it improves model convergence thus more relaiability. 	2025-07-08 20:23:20.100537
ca97ab9a-8a40-4d1a-828f-4d500113676c	0f9c5202-dcd9-4678-8537-316b8d77ca97	Feature Engineering	At this stage we extracted temporal features from the time variable to ensure that the model supports generalization and context-aware (i.e. day and night hours).  	2025-07-08 20:43:30.599854
d563da1a-3e89-4fc4-ab82-c31b31c996a0	7b26b5f0-89e3-429f-a53b-57ee336068cf	Model Development	At this stage we selected LSTM model for it's effective performance when dealing with timeseries data and for prediction problems (regression). 	2025-07-08 21:20:08.819926
80e9bb72-84a7-48ea-bf8c-1d529b281898	7b26b5f0-89e3-429f-a53b-57ee336068cf	Model Sensitivity Test	In this test, we simulated a sudden drop in TSI (i.e. cloud cover) to see how well the model performs. 	2025-07-08 21:51:23.690663
95d84119-b10a-472e-9bd0-a40cd5078b14	95a57c30-2418-40cc-a4ff-65ae55f1fd36	Deployment environment 	AWS service	2025-07-13 03:54:01.954082
1625bb8d-3230-46bf-8184-e01a4dd74850	95a57c30-2418-40cc-a4ff-65ae55f1fd36	Performance Monitoring 	Monitoring by Grip operators 	2025-07-13 03:57:59.806552
00e489f9-df62-47b8-9a5b-beb35c204c86	4447d945-0081-43f6-8e22-ac6f5c6fac02	Data Preparation	In this stage, dataset is imported and adjusted from DSV to standard csv using delimter() function for further analysis. First, the columns are renamed to shorter forms for better visualisation. Timestamp parsing is important for timeseries data analysis. Empty columns are all dropped, and this method (dropna()) does not affect columns with at least one value in it's cells/rows. Datatype of the time column is converted to datetime for timeseries analysis and all other columns are converted to float64. For decimal/floating points, a comma(,) was used in the dataset by default and therefore it has to be converted to a period/dot.	2025-07-13 15:03:33.9142
\.


--
-- TOC entry 4939 (class 0 OID 16554)
-- Dependencies: 221
-- Data for Name: pipeline_stages; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.pipeline_stages (id, name, description) FROM stdin;
4447d945-0081-43f6-8e22-ac6f5c6fac02	Data Collection	Stage for collecting training dataset for the ML Model
0f9c5202-dcd9-4678-8537-316b8d77ca97	Data Preprocessing	Stage for cleaning and preprocessing training dataset for the ML Model
7b26b5f0-89e3-429f-a53b-57ee336068cf	Model Development	Stage for selecting, training and validation of the ML Model
95a57c30-2418-40cc-a4ff-65ae55f1fd36	Model Deployment	Stage for deploying and continuous monitoring of the ML Model performance.
\.


--
-- TOC entry 4940 (class 0 OID 16563)
-- Dependencies: 222
-- Data for Name: responsible_actors; Type: TABLE DATA; Schema: public; Owner: aimap_user
--

COPY public.responsible_actors (id, name, role, contributions, decisions, reasons, "timestamp") FROM stdin;
6b1b91d8-4213-4cad-84cd-3f25868914fb	Actor1	Data Engineer	Collecting training data	Decided on to collect training dataset on science direct data portal.	Dataset was open source and licensed by Creative Commons. Datasets were aligned to the research requirement. 	2025-07-05 23:14:45.41411
f868cb87-8e18-439c-b1ff-b9ecc3fb8386	Actor 2	Researcher 	Choice data preprocessing methods.	Assessed data quality issues and decided on preprocessing methods such as imputation of missing values, outlier management, normalization, feature engineering, visualizations and model algorithm choice.	All choices are were made based on the research target, i.e. to measure performance and accountability of statistical vs AI-based preprocessing methods.	2025-07-07 00:11:17.933076
e4831b98-f517-490e-add3-1f236674cca7	Actor 3	DevOps Engineer	Deployment of the model. 	Decided to deply model on AWS.	For reliable service delivery. 	2025-07-13 03:52:57.447059
39f4be63-4df9-4feb-b9f5-c6ada41cb01c	Actor 4	Grid operator	Monitoring 	none	none	2025-07-13 03:57:15.189834
\.


--
-- TOC entry 4774 (class 2606 OID 16457)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- TOC entry 4772 (class 2606 OID 16402)
-- Name: data_collection_details data_collection_details_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.data_collection_details
    ADD CONSTRAINT data_collection_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 16395)
-- Name: data_collection_methods data_collection_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.data_collection_methods
    ADD CONSTRAINT data_collection_methods_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 16543)
-- Name: method_actor_association method_actor_association_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.method_actor_association
    ADD CONSTRAINT method_actor_association_pkey PRIMARY KEY (method_id, actor_id);


--
-- TOC entry 4786 (class 2606 OID 16588)
-- Name: pipeline_details pipeline_details_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.pipeline_details
    ADD CONSTRAINT pipeline_details_pkey PRIMARY KEY (id);


--
-- TOC entry 4784 (class 2606 OID 16576)
-- Name: pipeline_methods pipeline_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.pipeline_methods
    ADD CONSTRAINT pipeline_methods_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 16562)
-- Name: pipeline_stages pipeline_stages_name_key; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.pipeline_stages
    ADD CONSTRAINT pipeline_stages_name_key UNIQUE (name);


--
-- TOC entry 4780 (class 2606 OID 16560)
-- Name: pipeline_stages pipeline_stages_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.pipeline_stages
    ADD CONSTRAINT pipeline_stages_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 16569)
-- Name: responsible_actors responsible_actors_pkey; Type: CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.responsible_actors
    ADD CONSTRAINT responsible_actors_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16403)
-- Name: data_collection_details data_collection_details_method_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.data_collection_details
    ADD CONSTRAINT data_collection_details_method_id_fkey FOREIGN KEY (method_id) REFERENCES public.data_collection_methods(id);


--
-- TOC entry 4789 (class 2606 OID 16589)
-- Name: pipeline_details pipeline_details_method_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.pipeline_details
    ADD CONSTRAINT pipeline_details_method_id_fkey FOREIGN KEY (method_id) REFERENCES public.pipeline_methods(id);


--
-- TOC entry 4788 (class 2606 OID 16577)
-- Name: pipeline_methods pipeline_methods_stage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aimap_user
--

ALTER TABLE ONLY public.pipeline_methods
    ADD CONSTRAINT pipeline_methods_stage_id_fkey FOREIGN KEY (stage_id) REFERENCES public.pipeline_stages(id);


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO aimap_user;


-- Completed on 2025-08-12 03:54:56

--
-- PostgreSQL database dump complete
--

