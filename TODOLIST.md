
## Requirements

### BackEnd
- Dashboard接口  done
- Accounts接口    done
- Withdraws接口   done
- Orders接口      done
- Deposits接口    done
- Wallets接口
- Users接口
- Logs接口

### FrontEnd
- Dashboard界面  done

        近5日用户新增情况
        24小时各币种交易量
        与币有关
            近5日提币，近5日充值，未审核提币，在充币中
        与交易对有关：
            近5日交易量，今日交易量（分时）

- Accounts界面

        查询
        单个详情以及操作（disable/enable）

- Withdraws界面

        提现列表（有审核状态）
        单个详情以及操作（拒绝/通过）

- Orders界面

        订单列表
        订单详情

- Deposits界面

        充值列表(有审核状态)
        单个详情以及操作（拒绝/通过）

- Wallets界面

        钱包地址列表
        地址balance详情，以及过往流水

- Users

        用户列表
        用户详情

- Logs
    
        用户操作记录

## Framework

- performance, minify bundle size  (包大小优化)
- language switch （多语言切换）
- 常量等改为预请求，不采用注入方式  done
- hot-reload功能  done
- 测试正常  done
