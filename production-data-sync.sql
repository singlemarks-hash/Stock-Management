-- ==============================================
-- 프로덕션 데이터베이스 동기화 스크립트
-- 개발 DB -> 프로덕션 DB 데이터 이관용
-- 
-- 사용법:
-- 1. Replit 프로젝트에서 "Database" 탭 클릭
-- 2. "Production Database" 선택
-- 3. "SQL console" 클릭
-- 4. 이 스크립트 전체를 붙여넣고 실행
-- ==============================================

-- 먼저 기존 데이터 삭제 (순서 중요: 외래키 제약조건 때문)
DELETE FROM item_orders;
DELETE FROM inventory_items;
DELETE FROM menu_tags;
DELETE FROM sub_categories;
DELETE FROM suppliers;

-- ==============================================
-- 1. SUPPLIERS (공급업체)
-- ==============================================
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-c1', 'cafe', '도레미', NULL);
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-c2', 'cafe', '쿠팡', 'https://www.coupang.com');
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-c3', 'cafe', '그린팜', NULL);
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-c4', 'cafe', '네이버', 'https://shopping.naver.com');
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-c5', 'cafe', '기타', NULL);
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-k1', 'kitchen', '도레미', NULL);
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-k2', 'kitchen', '쿠팡', 'https://www.coupang.com');
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-k3', 'kitchen', '그린팜', NULL);
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-k4', 'kitchen', '네이버', 'https://shopping.naver.com');
INSERT INTO suppliers (id, team, name, url) VALUES ('sup-k5', 'kitchen', '기타', NULL);

-- ==============================================
-- 2. MENU_TAGS (메뉴 태그) - 색상은 NULL로 설정 (자동 생성 사용)
-- ==============================================
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-c1', 'cafe', '아메리카노', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-c2', 'cafe', '카페라떼', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-c3', 'cafe', '바닐라라떼', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-c4', 'cafe', '카푸치노', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-c5', 'cafe', '에스프레소', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-c6', 'cafe', '모카', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k1', 'kitchen', '코티지파이', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k10', 'kitchen', '티라미슈', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k11', 'kitchen', '샐러드', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k12', 'kitchen', '브루기뇽', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k13', 'kitchen', '감바스', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k14', 'kitchen', '어니언스프', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k15', 'kitchen', '트러플추가', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k16', 'kitchen', '오이스터', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k17', 'kitchen', '수제바게트', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k2', 'kitchen', '까망베르치즈구이', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k3', 'kitchen', '올리브파스타', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k4', 'kitchen', '잠봉파스타', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k5', 'kitchen', '프렌치토스트', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k6', 'kitchen', '토마토스프', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k7', 'kitchen', '꿀대구', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k8', 'kitchen', '뇨끼', NULL);
INSERT INTO menu_tags (id, team, name, color) VALUES ('tag-k9', 'kitchen', '치즈팔레트', NULL);

-- ==============================================
-- 3. SUB_CATEGORIES (소분류)
-- ==============================================
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-c1', 'cafe', 'food', '원두·커피');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-c2', 'cafe', 'food', '시럽·소스');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-c3', 'cafe', 'non-food', '소모품');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k1', 'kitchen', 'food', '유제품&치즈');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k10', 'kitchen', 'food', '냉동빵류');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k11', 'kitchen', 'food', '냉동기타');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k12', 'kitchen', 'food', '상온채소');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k13', 'kitchen', 'food', '가공식품');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k14', 'kitchen', 'food', '오일');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k15', 'kitchen', 'food', '캔');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k16', 'kitchen', 'food', '상온소스');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k17', 'kitchen', 'food', '건허브&향신료');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k18', 'kitchen', 'food', '견과류&곡물류');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k19', 'kitchen', 'food', '가루류');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k2', 'kitchen', 'food', '가공육류&알');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k20', 'kitchen', 'non-food', '소모품');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k3', 'kitchen', 'food', '잎채소&허브류');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k4', 'kitchen', 'food', '채소&버섯&과일');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k5', 'kitchen', 'food', '소스&절임류');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k6', 'kitchen', 'food', '특수발주');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k7', 'kitchen', 'food', '냉동유제품');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k8', 'kitchen', 'food', '냉동육류');
INSERT INTO sub_categories (id, team, main_category, name) VALUES ('subcat-k9', 'kitchen', 'food', '냉동해산물');

-- ==============================================
-- 4. INVENTORY_ITEMS (재고 품목) - 120개
-- ==============================================

-- 카페 아이템
INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('02394944-9130-42d1-b5f7-e17aa5c61a3c', 'cafe', '아메리카노 원두', 'food', 'room-temp', '원두·커피', '개', 1, 0.5, 2, 5, '[{"season": "winter", "requiredStock": 3}, {"season": "spring", "requiredStock": 3}, {"season": "summer", "requiredStock": 3}, {"season": "fall", "requiredStock": 3}]'::jsonb, '[]'::jsonb, NULL, 'ordered', 2, '2026-01-11T15:17:24.976Z', 'sup-c5', 0);

-- 주방 아이템 (냉장)
INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('0655d4eb-698a-410d-9a33-af3b65c7330e', 'kitchen', '.전처리양파_쵸핑', 'food', 'refrigerated', '채소&버섯&과일', '개', 10, 0, 2, 10, '[{"season": "winter", "leadTime": 2, "dailyUsage": 0, "safetyStock": 10, "requiredStock": 10}, {"season": "spring", "leadTime": 2, "dailyUsage": 0, "safetyStock": 10, "requiredStock": 10}, {"season": "summer", "leadTime": 2, "dailyUsage": 0, "safetyStock": 10, "requiredStock": 10}, {"season": "fall", "leadTime": 2, "dailyUsage": 0, "safetyStock": 10, "requiredStock": 10}]'::jsonb, '["tag-k1"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('65b02895-2f2f-4925-bc5b-efcd02545728', 'kitchen', '0.깐마늘', 'food', 'refrigerated', '채소&버섯&과일', '개', 1, 0.1, 1, 1, '[{"season": "winter", "leadTime": 1, "dailyUsage": 0.1, "safetyStock": 0.5, "requiredStock": 1}, {"season": "spring", "leadTime": 1, "dailyUsage": 0.1, "safetyStock": 1, "requiredStock": 1}, {"season": "summer", "leadTime": 1, "dailyUsage": 0.1, "safetyStock": 1, "requiredStock": 1}, {"season": "fall", "leadTime": 1, "dailyUsage": 0.1, "safetyStock": 1, "requiredStock": 1}]'::jsonb, '["tag-k7"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('68892ed8-7814-4f66-840c-54c5c8a93914', 'kitchen', '.전처리양파_채', 'food', 'refrigerated', '채소&버섯&과일', '개', 6, 1, 2, 4, '[{"season": "winter", "leadTime": 2, "dailyUsage": 1, "safetyStock": 4, "requiredStock": 6}, {"season": "spring", "leadTime": 2, "dailyUsage": 1, "safetyStock": 4, "requiredStock": 6}, {"season": "summer", "leadTime": 2, "dailyUsage": 1, "safetyStock": 4, "requiredStock": 6}, {"season": "fall", "leadTime": 2, "dailyUsage": 1, "safetyStock": 4, "requiredStock": 6}]'::jsonb, '["tag-k14"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-001', 'kitchen', '슬라이스 치즈', 'food', 'refrigerated', '유제품&치즈', '개', 1, 0.1, 1, 20, '[{"season": "winter", "requiredStock": 1}, {"season": "spring", "requiredStock": 1}, {"season": "summer", "requiredStock": 1}, {"season": "fall", "requiredStock": 1}]'::jsonb, '["tag-k1"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-002', 'kitchen', '까망베르 치즈', 'food', 'refrigerated', '유제품&치즈', '개', 12, 2, 1, 10, '[{"season": "winter", "requiredStock": 12}, {"season": "spring", "requiredStock": 12}, {"season": "summer", "requiredStock": 12}, {"season": "fall", "requiredStock": 12}]'::jsonb, '["tag-k2"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-003', 'kitchen', '그라나파다노', 'food', 'refrigerated', '유제품&치즈', '개', 3, 0, 1, 3, '[{"season": "winter", "requiredStock": 3}, {"season": "spring", "requiredStock": 3}, {"season": "summer", "requiredStock": 3}, {"season": "fall", "requiredStock": 3}]'::jsonb, '["tag-k3", "tag-k4", "tag-k8"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-004', 'kitchen', '페코리노', 'food', 'refrigerated', '유제품&치즈', '개', 1, 0, 1, 1, '[{"season": "winter", "requiredStock": 1}, {"season": "spring", "requiredStock": 1}, {"season": "summer", "requiredStock": 1}, {"season": "fall", "requiredStock": 1}]'::jsonb, '["tag-k5"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-005', 'kitchen', '난황', 'food', 'refrigerated', '유제품&치즈', '개', 1, 0, 1, 1, '[{"season": "winter", "requiredStock": 1}, {"season": "spring", "requiredStock": 1}, {"season": "summer", "requiredStock": 1}, {"season": "fall", "requiredStock": 1}]'::jsonb, '["tag-k10", "tag-k5"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, NULL, 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-006', 'kitchen', '우유', 'food', 'refrigerated', '유제품&치즈', '개', 3, 1, 1, 2, '[{"season": "winter", "requiredStock": 3}, {"season": "spring", "requiredStock": 3}, {"season": "summer", "requiredStock": 3}, {"season": "fall", "requiredStock": 3}]'::jsonb, '["tag-k1", "tag-k8"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-007', 'kitchen', '생크림', 'food', 'refrigerated', '유제품&치즈', '개', 29, 3, 1, 10, '[{"season": "winter", "requiredStock": 13}, {"season": "spring", "requiredStock": 13}, {"season": "summer", "requiredStock": 13}, {"season": "fall", "requiredStock": 13}]'::jsonb, '["tag-k4", "tag-k5", "tag-k10"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k1', 0);

INSERT INTO inventory_items (id, team, name, main_category, storage_type, sub_category, unit, current_stock, daily_usage, lead_time, safety_stock, seasonal_requirements, menu_tags, check_date, order_status, ordered_quantity, ordered_at, supplier_id, is_favorite) VALUES ('item-008', 'kitchen', '비건생크림', 'food', 'refrigerated', '유제품&치즈', '개', 1, 0, 1, 1, '[{"season": "winter", "requiredStock": 1}, {"season": "spring", "requiredStock": 1}, {"season": "summer", "requiredStock": 1}, {"season": "fall", "requiredStock": 1}]'::jsonb, '["tag-k6"]'::jsonb, '2026-01-14', 'normal', NULL, NULL, 'sup-k2', 0);

-- 스크립트 실행 완료 메시지
SELECT '데이터 동기화가 완료되었습니다. 총 ' || 
       (SELECT COUNT(*) FROM inventory_items) || '개의 재고 품목, ' ||
       (SELECT COUNT(*) FROM menu_tags) || '개의 메뉴 태그, ' ||
       (SELECT COUNT(*) FROM suppliers) || '개의 공급업체가 동기화되었습니다.' as result;
