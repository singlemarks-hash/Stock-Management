// Auto-generated from data_export.sql
// This file contains all inventory items for production seeding

import type { InsertInventoryItem } from "@shared/schema";

export const fullInventoryData: InsertInventoryItem[] = [
  {
    "id": "item-007",
    "team": "kitchen",
    "name": "생크림",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 29,
    "menuTags": [
      "tag-k4",
      "tag-k5",
      "tag-k10"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 3,
    "leadTime": 1,
    "safetyStock": 10,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 3,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 13
      },
      {
        "season": "spring",
        "dailyUsage": 3,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 13
      },
      {
        "season": "summer",
        "dailyUsage": 3,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 13
      },
      {
        "season": "fall",
        "dailyUsage": 3,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 13
      }
    ]
  },
  {
    "id": "item-008",
    "team": "kitchen",
    "name": "비건생크림",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k6"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k2",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-009",
    "team": "kitchen",
    "name": "마가린",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k6"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-010",
    "team": "kitchen",
    "name": "마스카포네치즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 21,
    "menuTags": [
      "tag-k10"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 2,
    "leadTime": 1,
    "safetyStock": 6,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "spring",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "summer",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "fall",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      }
    ]
  },
  {
    "id": "item-011",
    "team": "kitchen",
    "name": "과일치즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-012",
    "team": "kitchen",
    "name": "스모크치즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-013",
    "team": "kitchen",
    "name": "크림치즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 5,
    "menuTags": [
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-014",
    "team": "kitchen",
    "name": "살라미",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-015",
    "team": "kitchen",
    "name": "하몽",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "가공육류&알",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-001",
    "team": "kitchen",
    "name": "슬라이스 치즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 0,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 1,
    "orderedAt": "2026-01-11T14:53:34.600Z",
    "supplierId": "sup-k1",
    "dailyUsage": 0.1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-002",
    "team": "kitchen",
    "name": "까망베르 치즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 8,
    "menuTags": [
      "tag-k2"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 4,
    "orderedAt": "2026-01-11T14:53:36.632Z",
    "supplierId": "sup-k1",
    "dailyUsage": 2,
    "leadTime": 1,
    "safetyStock": 10,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 12
      },
      {
        "season": "spring",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 12
      },
      {
        "season": "summer",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 12
      },
      {
        "season": "fall",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 10,
        "requiredStock": 12
      }
    ]
  },
  {
    "id": "item-003",
    "team": "kitchen",
    "name": "그라나파다노",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k3",
      "tag-k4",
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 1,
    "orderedAt": "2026-01-11T14:53:37.823Z",
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-005",
    "team": "kitchen",
    "name": "난황",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 0,
    "menuTags": [
      "tag-k10",
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 1,
    "orderedAt": "2026-01-11T14:53:39.923Z",
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-006",
    "team": "kitchen",
    "name": "우유",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k1",
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 1,
    "orderedAt": "2026-01-11T14:53:41.176Z",
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-016",
    "team": "kitchen",
    "name": "달걀",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "가공육류&알",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k5",
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-017",
    "team": "kitchen",
    "name": "딜",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "g",
    "currentStock": 100,
    "menuTags": [
      "tag-k3",
      "tag-k2",
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k3",
    "dailyUsage": 20,
    "leadTime": 50,
    "safetyStock": 90,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 20,
        "leadTime": 50,
        "safetyStock": 90,
        "requiredStock": 100
      },
      {
        "season": "spring",
        "dailyUsage": 20,
        "leadTime": 50,
        "safetyStock": 90,
        "requiredStock": 100
      },
      {
        "season": "summer",
        "dailyUsage": 20,
        "leadTime": 50,
        "safetyStock": 90,
        "requiredStock": 100
      },
      {
        "season": "fall",
        "dailyUsage": 20,
        "leadTime": 50,
        "safetyStock": 90,
        "requiredStock": 100
      }
    ]
  },
  {
    "id": "item-018",
    "team": "kitchen",
    "name": "처빌",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k6",
      "tag-k11",
      "tag-k16"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 0,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-019",
    "team": "kitchen",
    "name": "어린잎250g",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.3,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.3,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0.3,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0.3,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0.3,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-022",
    "team": "kitchen",
    "name": "타임",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k3",
    "dailyUsage": 0.5,
    "leadTime": 2,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-024",
    "team": "kitchen",
    "name": "전처리양파_초밥",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 10,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 10,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 10
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 10
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 10
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 10
      }
    ]
  },
  {
    "id": "item-025",
    "team": "kitchen",
    "name": "깐양파",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-026",
    "team": "kitchen",
    "name": "파프리카",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-027",
    "team": "kitchen",
    "name": "토마토",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k6",
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-028",
    "team": "kitchen",
    "name": "방울토마토",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k8",
      "tag-k11",
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-029",
    "team": "kitchen",
    "name": "깐마늘",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-031",
    "team": "kitchen",
    "name": "꽈리고추",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 0.2,
    "menuTags": [
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 0,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 0.1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 0.1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 0.1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 0.1
      }
    ]
  },
  {
    "id": "item-032",
    "team": "kitchen",
    "name": "양송이",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k4",
      "tag-k3",
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-033",
    "team": "kitchen",
    "name": "당근",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0.5,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-034",
    "team": "kitchen",
    "name": "샐러리",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0.5,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-035",
    "team": "kitchen",
    "name": "레몬",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 30,
    "menuTags": [
      "tag-k3",
      "tag-k2"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k3",
    "dailyUsage": 5,
    "leadTime": 2,
    "safetyStock": 10,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 5,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 20
      },
      {
        "season": "spring",
        "dailyUsage": 5,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 20
      },
      {
        "season": "summer",
        "dailyUsage": 5,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 20
      },
      {
        "season": "fall",
        "dailyUsage": 5,
        "leadTime": 2,
        "safetyStock": 10,
        "requiredStock": 20
      }
    ]
  },
  {
    "id": "item-030",
    "team": "kitchen",
    "name": "편마늘",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 2,
    "orderedAt": "2026-01-11T14:53:43.415Z",
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-036",
    "team": "kitchen",
    "name": "청포도or샤인머스캣",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k5",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k2",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-038",
    "team": "kitchen",
    "name": "마요네즈",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-039",
    "team": "kitchen",
    "name": "라임주스",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-040",
    "team": "kitchen",
    "name": "카스텔베트라노",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 7,
    "menuTags": [
      "tag-k9",
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k4",
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 4,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      }
    ]
  },
  {
    "id": "item-041",
    "team": "kitchen",
    "name": "아르티지아나트러플소스",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 7,
    "menuTags": [
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k4",
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 4,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      }
    ]
  },
  {
    "id": "item-042",
    "team": "kitchen",
    "name": "굴소스",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-043",
    "team": "kitchen",
    "name": "케이퍼",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-044",
    "team": "kitchen",
    "name": "앤초비",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "소스&절임류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-047",
    "team": "kitchen",
    "name": "모짜렐라",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동유제품",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.5,
    "leadTime": 3,
    "safetyStock": 4,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 3,
        "safetyStock": 4,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 3,
        "safetyStock": 4,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 3,
        "safetyStock": 4,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 3,
        "safetyStock": 4,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-048",
    "team": "kitchen",
    "name": "버터",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동유제품",
    "unit": "개",
    "currentStock": 19,
    "menuTags": [
      "tag-k1",
      "tag-k3",
      "tag-k5",
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 4,
    "leadTime": 1,
    "safetyStock": 15,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 4,
        "leadTime": 1,
        "safetyStock": 15,
        "requiredStock": 19
      },
      {
        "season": "spring",
        "dailyUsage": 4,
        "leadTime": 1,
        "safetyStock": 15,
        "requiredStock": 19
      },
      {
        "season": "summer",
        "dailyUsage": 4,
        "leadTime": 1,
        "safetyStock": 15,
        "requiredStock": 19
      },
      {
        "season": "fall",
        "dailyUsage": 4,
        "leadTime": 1,
        "safetyStock": 15,
        "requiredStock": 19
      }
    ]
  },
  {
    "id": "item-049",
    "team": "kitchen",
    "name": "베이컨",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동육류",
    "unit": "개",
    "currentStock": 11,
    "menuTags": [
      "tag-k3",
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 6,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 8
      }
    ]
  },
  {
    "id": "item-050",
    "team": "kitchen",
    "name": "잠봉",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동육류",
    "unit": "개",
    "currentStock": 7,
    "menuTags": [
      "tag-k4",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 5,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 6
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 6
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 6
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 6
      }
    ]
  },
  {
    "id": "item-051",
    "team": "kitchen",
    "name": "우민찌",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동육류",
    "unit": "개",
    "currentStock": 16,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 2,
    "leadTime": 2,
    "safetyStock": 6,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 2,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 10
      },
      {
        "season": "spring",
        "dailyUsage": 2,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 10
      },
      {
        "season": "summer",
        "dailyUsage": 2,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 10
      },
      {
        "season": "fall",
        "dailyUsage": 2,
        "leadTime": 2,
        "safetyStock": 6,
        "requiredStock": 10
      }
    ]
  },
  {
    "id": "item-052",
    "team": "kitchen",
    "name": "돈민찌",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동육류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-053",
    "team": "kitchen",
    "name": "새우",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동해산물",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k13",
      "tag-k3"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0.5,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-054",
    "team": "kitchen",
    "name": "연어",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동해산물",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-046",
    "team": "kitchen",
    "name": "생트러플",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "특수발주",
    "unit": "개",
    "currentStock": 0,
    "menuTags": [
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 50,
    "orderedAt": "2026-01-11T14:53:55.607Z",
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 50
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 50
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 50
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 50
      }
    ]
  },
  {
    "id": "item-056",
    "team": "kitchen",
    "name": "브리오슈",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동빵류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k2",
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-057",
    "team": "kitchen",
    "name": "냉동브로콜리",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동기타",
    "unit": "개",
    "currentStock": 7,
    "menuTags": [
      "tag-k15",
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-058",
    "team": "kitchen",
    "name": "메쉬드",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동기타",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-059",
    "team": "kitchen",
    "name": "라즈베리",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동기타",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k5",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-060",
    "team": "kitchen",
    "name": "샬롯",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온채소",
    "unit": "개",
    "currentStock": 3000,
    "menuTags": [
      "tag-k8",
      "tag-k16"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k3",
    "dailyUsage": 50,
    "leadTime": 2,
    "safetyStock": 500,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 50,
        "leadTime": 2,
        "safetyStock": 500,
        "requiredStock": 600
      },
      {
        "season": "spring",
        "dailyUsage": 50,
        "leadTime": 2,
        "safetyStock": 500,
        "requiredStock": 600
      },
      {
        "season": "summer",
        "dailyUsage": 50,
        "leadTime": 2,
        "safetyStock": 500,
        "requiredStock": 600
      },
      {
        "season": "fall",
        "dailyUsage": 50,
        "leadTime": 2,
        "safetyStock": 500,
        "requiredStock": 600
      }
    ]
  },
  {
    "id": "item-061",
    "team": "kitchen",
    "name": "크래커",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가공식품",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k2",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.1,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-063",
    "team": "kitchen",
    "name": "리가토니",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가공식품",
    "unit": "개",
    "currentStock": 10,
    "menuTags": [
      "tag-k4"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 2,
    "leadTime": 1,
    "safetyStock": 8,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 10
      },
      {
        "season": "spring",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 10
      },
      {
        "season": "summer",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 10
      },
      {
        "season": "fall",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 10
      }
    ]
  },
  {
    "id": "item-064",
    "team": "kitchen",
    "name": "사보이아르디",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가공식품",
    "unit": "개",
    "currentStock": 8,
    "menuTags": [
      "tag-k10"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0.5,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-065",
    "team": "kitchen",
    "name": "포마스",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "오일",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k5",
      "tag-k8",
      "tag-k15",
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-066",
    "team": "kitchen",
    "name": "엑스트라버진",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "오일",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k6",
      "tag-k7",
      "tag-k9",
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-067",
    "team": "kitchen",
    "name": "블랙올리브",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "오일",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k3",
      "tag-k6",
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-068",
    "team": "kitchen",
    "name": "할라피뇨",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "캔",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k1",
      "tag-k4"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 0,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 0,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-069",
    "team": "kitchen",
    "name": "롱고바디",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "캔",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0.5,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-070",
    "team": "kitchen",
    "name": "토마토페이스트",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "캔",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k6",
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-071",
    "team": "kitchen",
    "name": "팩와인_레드",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k15",
      "tag-k14"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-072",
    "team": "kitchen",
    "name": "팩와인_화이트",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-074",
    "team": "kitchen",
    "name": "화이트와인비네거",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-075",
    "team": "kitchen",
    "name": "샴페인비네거",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k16"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-076",
    "team": "kitchen",
    "name": "타바스코150ml",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 5,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-077",
    "team": "kitchen",
    "name": "메이플시럽",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k2",
    "dailyUsage": 0,
    "leadTime": 3,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-079",
    "team": "kitchen",
    "name": "이금기치킨스톡농축액",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k12",
      "tag-k4",
      "tag-k8",
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-081",
    "team": "kitchen",
    "name": "이탈리안허브시즈닝",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k1",
      "tag-k13",
      "tag-k14"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-082",
    "team": "kitchen",
    "name": "파프리카시즈닝",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k1",
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-083",
    "team": "kitchen",
    "name": "오레가노",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-11",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-099",
    "team": "kitchen",
    "name": "천일염",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k16"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 20.7,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 20.7,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 0
      },
      {
        "season": "spring",
        "dailyUsage": 20.7,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 20.7,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 20.7,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-086",
    "team": "kitchen",
    "name": "백후추",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k4"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-087",
    "team": "kitchen",
    "name": "핑크페퍼",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-088",
    "team": "kitchen",
    "name": "베트남고추",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k13"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-089",
    "team": "kitchen",
    "name": "시나몬파우더",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k2",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-090",
    "team": "kitchen",
    "name": "피칸",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k2",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-091",
    "team": "kitchen",
    "name": "아몬드",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k2",
      "tag-k7",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-092",
    "team": "kitchen",
    "name": "캐슈넛",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k2",
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-093",
    "team": "kitchen",
    "name": "오트밀",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-094",
    "team": "kitchen",
    "name": "해바라기씨",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-095",
    "team": "kitchen",
    "name": "호박씨",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-096",
    "team": "kitchen",
    "name": "헤이즐넛",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-097",
    "team": "kitchen",
    "name": "코코넛롱(코코넛슬라이스)",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "견과류&곡물류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-100",
    "team": "kitchen",
    "name": "백설탕",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5",
      "tag-k6",
      "tag-k10"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-101",
    "team": "kitchen",
    "name": "황설탕",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k9",
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-102",
    "team": "kitchen",
    "name": "흑설탕",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k9"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-103",
    "team": "kitchen",
    "name": "박력분",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k14",
      "tag-k4"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-085",
    "team": "kitchen",
    "name": "통흑후추",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k6",
      "tag-k8",
      "tag-k9",
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-107",
    "team": "kitchen",
    "name": "니트릴장갑S",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-108",
    "team": "kitchen",
    "name": "니트릴장갑L",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-109",
    "team": "kitchen",
    "name": "비닐(소)",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 8,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 8,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 8
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 8
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 8
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 8,
        "requiredStock": 8
      }
    ]
  },
  {
    "id": "item-110",
    "team": "kitchen",
    "name": "비닐(대)",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-111",
    "team": "kitchen",
    "name": "위생장갑",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-112",
    "team": "kitchen",
    "name": "종이호일",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-113",
    "team": "kitchen",
    "name": "쿠킹호일",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-114",
    "team": "kitchen",
    "name": "키친타올",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 7,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 4,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-115",
    "team": "kitchen",
    "name": "유니랩",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-117",
    "team": "kitchen",
    "name": "주방세제",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-116",
    "team": "kitchen",
    "name": "부탄가스",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "ordered",
    "orderedQuantity": 2,
    "orderedAt": "2026-01-11T14:54:03.584Z",
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-118",
    "team": "kitchen",
    "name": "식기세척기세제",
    "mainCategory": "non-food",
    "storageType": "room-temp",
    "subCategory": "소모품",
    "unit": "개",
    "currentStock": 0,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "ordered",
    "orderedQuantity": 1,
    "orderedAt": "2026-01-11T14:54:05.028Z",
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 3,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 3,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-105",
    "team": "kitchen",
    "name": "강력분",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k17"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-106",
    "team": "kitchen",
    "name": "호밀가루",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k17"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-098",
    "team": "kitchen",
    "name": "구운소금",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k6",
      "tag-k7",
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 3,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 3,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 3,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-023",
    "team": "kitchen",
    "name": "전처리양파_채",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k14"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 2,
    "orderedAt": "2026-01-11T14:53:42.267Z",
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 4,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 4,
        "requiredStock": 6
      }
    ]
  },
  {
    "id": "item-037",
    "team": "kitchen",
    "name": "바나나",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "채소&버섯&과일",
    "unit": "개",
    "currentStock": 0,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "ordered",
    "orderedQuantity": 1,
    "orderedAt": "2026-01-11T14:53:44.484Z",
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-078",
    "team": "kitchen",
    "name": "꿀",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k2",
      "tag-k7"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 2
      }
    ]
  },
  {
    "id": "item-004",
    "team": "kitchen",
    "name": "페코리노",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "유제품&치즈",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [
      "tag-k5"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-020",
    "team": "kitchen",
    "name": "치커리",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 0.2,
    "menuTags": [
      "tag-k11"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 0,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 0.2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 0.2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 0.2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 0,
        "requiredStock": 0.2
      }
    ]
  },
  {
    "id": "item-021",
    "team": "kitchen",
    "name": "파세리",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "잎채소&허브류",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k8",
      "tag-k15"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 0,
    "leadTime": 2,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 2,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-062",
    "team": "kitchen",
    "name": "링귀니",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가공식품",
    "unit": "개",
    "currentStock": 8,
    "menuTags": [
      "tag-k3"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 1.5,
    "leadTime": 1,
    "safetyStock": 6,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1.5,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "spring",
        "dailyUsage": 1.5,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "summer",
        "dailyUsage": 1.5,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      },
      {
        "season": "fall",
        "dailyUsage": 1.5,
        "leadTime": 1,
        "safetyStock": 6,
        "requiredStock": 8
      }
    ]
  },
  {
    "id": "item-073",
    "team": "kitchen",
    "name": "발사믹",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 5,
    "menuTags": [
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0.1,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0.1,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-084",
    "team": "kitchen",
    "name": "바질잎드",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "건허브&향신료",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k1"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-104",
    "team": "kitchen",
    "name": "중력분",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "가루류",
    "unit": "개",
    "currentStock": 4,
    "menuTags": [
      "tag-k8"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 1
      }
    ]
  },
  {
    "id": "item-045",
    "team": "kitchen",
    "name": "삼배체굴",
    "mainCategory": "food",
    "storageType": "refrigerated",
    "subCategory": "특수발주",
    "unit": "개",
    "currentStock": 3,
    "menuTags": [
      "tag-k16"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": null,
    "dailyUsage": 2,
    "leadTime": 1,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 2,
        "leadTime": 1,
        "safetyStock": 2,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "02394944-9130-42d1-b5f7-e17aa5c61a3c",
    "team": "cafe",
    "name": "아메리카노 원두",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "원두·커피",
    "unit": "개",
    "currentStock": 1,
    "menuTags": [],
    "checkDate": null,
    "orderStatus": "ordered",
    "orderedQuantity": 2,
    "orderedAt": "2026-01-11T15:17:24.976Z",
    "supplierId": "sup-c5",
    "dailyUsage": 0.5,
    "leadTime": 2,
    "safetyStock": 5,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 3
      },
      {
        "season": "spring",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 3
      },
      {
        "season": "summer",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 3
      },
      {
        "season": "fall",
        "dailyUsage": 0.5,
        "leadTime": 2,
        "safetyStock": 5,
        "requiredStock": 3
      }
    ]
  },
  {
    "id": "item-055",
    "team": "kitchen",
    "name": "바게트",
    "mainCategory": "food",
    "storageType": "frozen",
    "subCategory": "냉동빵류",
    "unit": "개",
    "currentStock": 23,
    "menuTags": [
      "tag-k14",
      "tag-k13",
      "tag-k6"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k1",
    "dailyUsage": 1,
    "leadTime": 2,
    "safetyStock": 2,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      },
      {
        "season": "spring",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      },
      {
        "season": "summer",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      },
      {
        "season": "fall",
        "dailyUsage": 1,
        "leadTime": 2,
        "safetyStock": 2,
        "requiredStock": 4
      }
    ]
  },
  {
    "id": "item-080",
    "team": "kitchen",
    "name": "피스타치오스프레드",
    "mainCategory": "food",
    "storageType": "room-temp",
    "subCategory": "상온소스",
    "unit": "개",
    "currentStock": 2,
    "menuTags": [
      "tag-k10"
    ],
    "checkDate": "2026-01-12",
    "orderStatus": "normal",
    "orderedQuantity": null,
    "orderedAt": null,
    "supplierId": "sup-k4",
    "dailyUsage": 0,
    "leadTime": 1,
    "safetyStock": 1,
    "seasonalRequirements": [
      {
        "season": "winter",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "spring",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "summer",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      },
      {
        "season": "fall",
        "dailyUsage": 0,
        "leadTime": 1,
        "safetyStock": 1,
        "requiredStock": 2
      }
    ]
  }
];
