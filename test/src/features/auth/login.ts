// ❌ 상대경로 import
import { someUtil } from "../../shared/util";

// ❌ 더 상위 계층 import
import { Widget } from "@widgets/UserWidgets";

// ✅ 올바른 import
import { User } from "@entities/user";
