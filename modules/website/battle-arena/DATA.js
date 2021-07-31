import asset from "plugins/assets/asset";
import { IsDev, IsStag } from "plugins/utils/ConfigLive";


// export const CHARACTER_PREFIX = "https://dev4.digitop.vn/demo/201106_Nuvi_World/public/models/characters";
export const CHARACTER_PREFIX =
    IsDev() || IsStag()
        ? "https://dev4.digitop.vn/demo/201106_Nuvi_World/public/models/characters"
        : asset("/models/characters");

export default class DATA_BATTER_ARENA {
    static MAX_ROW = 5;
    static MAX_COLUMN = 5;
    static PIECE_SCALE_FACTOR = .03381601;
    static PIECE_SIZE_WIDTH = 17.62296;
    static PIECE_SIZE_HEIGHT = 24.10298;
    static CARD_PIECE_SIZE = 10;
    static MAX_CARD_NUM = 3;
    static MAX_TEAMS = 2;
    static MAX_Z = - this.MAX_ROW * this.PIECE_SIZE_HEIGHT;
    static CENTER_POINT =
        {
            x: this.MAX_COLUMN * this.PIECE_SIZE_WIDTH / 2 - (this.PIECE_SIZE_WIDTH / 2),
            y: 0,
            z: - this.MAX_ROW * this.PIECE_SIZE_HEIGHT / 2 + (this.PIECE_SIZE_HEIGHT / 2)
        }
};


export class THEMES_BATTLE {
    static default = {
        PIECE: {
            folderPath: asset("/images/textures/game/battle-arena/ground/01/1x/")
        },
        HANDLER: {
            folderPath: asset("/images/textures/game/battle-arena/ground/01/")
        }
    }
};

export class GAME_DATA {
    static Cost = {
        NUVI_COIN: 0, 	//sử dụng nuvi coin để thực thi chiêu thức hoặc sử dụng vật phẩm
        MP: 1, 		//sử dụng năng lượng để thực thi chiêu thức hoặc sử dụng vật phẩm
        HP: 2,			//sử dụng máu để thực thi chiêu thức (1 vài linh thú đặc biệt)
        FREE: 3		//1 vài cái sử dụng miễn phí không tốn gì
    }

    static TargetType = {
        ALLIES: 0, 	//mục tiêu là chọn 
        ENEMIES: 1,
        PIECES: 2,
        ALL: 3
    }

    static AffectedAOE = {
        SINGLE: 0,			//chỉ 1 đối tượng bị ảnh hưởng
        VERTICAL: 1,		//tác động theo dạng hàng thẳng (góc bàn cờ)
        HORIZONTAL: 2,		//tác động theo dạng hàng ngang (góc bàn cờ)
        PLUS: 3,			//tác động theo dấu cộng tính từ vị trí người bị tấn công, khoảng cách 1 ô tính từ vị trí mục tiêu
        CROSS: 4,			//tác động theo đường chéo tính từ vị trí người bị tấn công, khoảng cách 1 ô tính từ vị trí mục tiêu
        SQUARE_3_X_3: 5,	//tác động dạng ô vuông xung quanh mục tiêu (9 ô)
        SQUARE_5_X_5: 6,	//tác động dạng ô vuông lớn xung quanh mục tiêu (25 ô), nếu nhân vật đứng góc thì sẽ không full bàn
        ALL: 7,			//tác động toàn bộ bàn cờ
        TEAMMATE: 8, 		//tác động lên tất cả đồng minh
        ENEMIES: 9			//tác động lên tất cả kẻ địch
    }

    static AffectedType = {
        DAMAGE: 0,		//gây sát thương
        DAMAGE_AOE: 1,	//gây sát thương diện rộng
        ATTACK: 2,		//(+value)tăng tấn công hoặc (-value)giảm tấn công
        DEFEND: 3,		//(+value)tăng phòng thủ hoặc (-value)giảm phòng thủ
        HP: 4,			//(+value)tăng máu hoặc (-value)giảm máu
        MP: 5,			//(+value)tăng năng lượng hoặc (-value)giảm năng lượng
        MAX_HP: 6,			//(+value)tăng máu tối đa hoặc (-value)giảm máu tối đa
        MAX_MP: 7			//(+value)tăng năng lượng tối đa hoặc (-value)giảm năng lượng tối đa
    }

    static AffectedState = {
        POISON: 'TRÚNG ĐỘC',	                    	//TRÚNG ĐỘC
        BUFF: 'TĂNG CHỈ SỐ',	                    	//TĂNG CHỈ SỐ
        REVIVAL: 'HỒI SINH',	                    //HỒI SINH
        KNOCK: 'KHỐNG CHẾ',	                    	//NGÃ, HẤT TUNG LÊN
        AROUSE: 'THÔI MIÊN',	                    	//THÔI MIÊN, KHIÊU KHÍCH
        ROOT: 'TRÓI CHÂN',	                    	//TRÓI CHÂN
        STUN: 'CHOÁNG',	                    	//GÂY CHOÁNG
        SLOW: 'LÀM CHẬM',	                    	//LÀM CHẬM
        INVISIBLE: 'TÀNG HÌNH',	                    //TÀN HÌNH
        RECOVERY_HP: 'HỒI PHỤC HP',	                    //HỒI PHỤC HP
        RECOVERY_MP: 'HỒI PHỤC MP',	                    //HỒI PHỤC HP
        CLONE: 'PHÂN THÂN',	                    	//PHÂN THÂN, BIẾN ẢNH
        FREEZE: 'ĐÓNG BĂNG,',	                    //ĐÓNG BĂNG,
        CRITICAL: 'CHÍ MẠNG',                   	//GÂY CHÍ MẠNG VỚI KĨ NĂNG NÀY
        GULP: 'NUỐT CHỬNG',	                    	//NUỐT CHỬNG ĐỐI THỦ
        FORCE: 'FORCE',	                    	//TÁC ĐỘNG LỰC LÊN ĐỐI THỦ
        SHEILD: 'KHIÊN,',                   	//TẠO KHIÊN BẢO VỆ ĐỒNG ĐỘI,
        AOE: 'ẢNH HƯỞNG DIỆN RỘNG',                     		//CÁC DẠNG ẢNH HƯỞNG DIỆN RỘNG
        SPAWN_TRAP: 'BẪY',                   //TẠO RA 1 CÁI BẪY
        REFLECT_DAMAGE: 'PHẢN ĐÒN',                   	//PHẢN LẠI SÁT THƯƠNG
        REFLECT_SKILL: 'PHẢN CHIÊU',	                    	//PHẢN LẠI KĨ NĂNG GÂY RA VỚI BẢN THÂN
        RECALL: 'TRIỆU HỒI LINH THÚ',	                    	//TRIỆU HỒI LINH THÚ VỀ BASE
        TELEPORT: 'DỊCH CHUYỂN',	                    	//DỊCH CHUYỂN BẤT KÌ Ô NÀO
        BURN: 'BỎNG',	                    	//BỎNG
    }
}

export class ITEM {
    static list = [
        {
            "id": "5ffc09d8a7c27c001a6c2de3",
            "targetType": GAME_DATA.TargetType.ENEMIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Kẹo cầu vồng",
            "nameNon": "keo cau vong",
            "description": "Vô hiệu hóa 1 linh thú, trong 1 lượt chơi",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [],//tác động theo số lượng đơn vị
                'rate': [],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [],//đây là sát thương đơn mục tiêu
                'probability': [],//xác xuất thành công  (100%)
                'duration': [],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.ROOT],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2de2",
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Thiên linh tẩy thạch",
            "nameNon": "thien linh tay thach",
            "description": "Hồi sinh linh thú bị đánh bại bất kỳ, nhưng với n% HP",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.HP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.5],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.REVIVAL],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2de1",
            "targetType": GAME_DATA.TargetType.PIECES,
            "smallImage": "",
            "largeImage": "",
            "name": "Bẫy phóng xạ",
            "nameNon": "bay phong xa",
            "description": "Trừ HP n lượt liên tục khi linh thú bị dẫm trúng",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.HP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [-0.1],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [3],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2de0",
            "targetType": GAME_DATA.TargetType.PIECES,
            "smallImage": "",
            "largeImage": "",
            "name": "Bẫy bom ca-cao",
            "nameNon": "bay bom ca-cao",
            "description": "Trừ ngẫu nhiên HP nếu linh thú dẫm trúng",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.HP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [[-0.2, -0.4]],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2ddf",
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Lọ nước trái cây nhỏ",
            "nameNon": "lo nuoc trai cay nho",
            "description": "Tăng MP cho 1 linh thú bất kỳ",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.MP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.2],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.RECOVERY_MP],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2ddf", //ID chưa gen mới
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Lọ nước trái cây vừa",
            "nameNon": "lo nuoc trai cay vua",
            "description": "Tăng MP cho 1 linh thú bất kỳ",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.MP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.3],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.RECOVERY_MP],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2ddf",  //ID chưa gen mới
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Lọ nước trái cây lớn",
            "nameNon": "lo nuoc trai cay lon",
            "description": "Tăng MP cho 1 linh thú bất kỳ",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.MP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.4],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.RECOVERY_MP],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2dde",
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Lọ sữa sinh lực nhỏ",
            "nameNon": "lo sua sinh luc nho",
            "description": "Tăng HP cho 1 linh thú bất kỳ",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.HP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.2],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.RECOVERY_HP],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2dde", //ID chưa gen mới
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Lọ sữa sinh lực vừa",
            "nameNon": "lo sua sinh luc vua",
            "description": "Tăng HP cho 1 linh thú bất kỳ",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.HP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.3],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.RECOVERY_HP],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        },
        {
            "id": "5ffc09d8a7c27c001a6c2dde", //ID chưa gen mới
            "targetType": GAME_DATA.TargetType.ALLIES,
            "smallImage": "",
            "largeImage": "",
            "name": "Lọ sữa sinh lực lớn",
            "nameNon": "lo sua sinh luc lon",
            "description": "Tăng HP cho 1 linh thú bất kỳ",
            "cost": 0,
            "costType": GAME_DATA.Cost.FREE,
            'affectedType': {//các chỉ số bị ảnh hưởng
                "type": [GAME_DATA.AffectedType.HP],//ảnh hưởng này như thế nào: gây sát thương, tăng tấn công, tăng HP....
                'number': [0],//tác động theo số lượng đơn vị
                'rate': [0.4],//tác động theo tỉ lệ phần trăm
                'aoe_rate': [0],//các đối tượng ảnh hưởng diện rộng bởi bao nhiêu % giá trị gốc gây ra
                'aoe_range': [GAME_DATA.AffectedAOE.SINGLE],//đây là sát thương đơn mục tiêu
                'probability': [1],//xác xuất thành công  (100%)
                'duration': [1],//gây sát thương trong 1 lượt
            },
            'affectedState': {//hiệu ứng đi kèm nếu có và thời gian hiệu lực, và tỉ lệ thành công 
                'type': [GAME_DATA.AffectedState.RECOVERY_HP],//hiệu ứng kèm theo của kĩ năng này như thế nào: choáng váng, hất tung...
                'chance': [0],///nếu có ít nhất 1 phần tử thì probability sẽ là giá trị quyết định có bị gây hiệu ứng hay không
                'probability': [1],//xác xuất thành công là 100% nếu đạt 2% chí mạng (vì chance có 1 phần tử vì vậy đây là mốc sẽ gây ra hiệu ứng STUN) hoặc sẽ không STUN
                'duration': [1],//chỉ bị choáng váng trong 1 lượt
            }
        }
    ]
};