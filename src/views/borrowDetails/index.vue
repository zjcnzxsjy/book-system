<template>
    <div>
        <div class='borrow-deader'>
            <mt-header title='借阅详情'>
                <div slot='left'><mt-button icon="back" @click='back'></mt-button></div>
            </mt-header>
        </div>
        <div>
            <mt-field label="书名:" :value='data.title' readonly :disableClear='true'></mt-field>
            <mt-field label="编号:" :value='data.borrowid' readonly :disableClear='true'></mt-field>
            <mt-field label="起始日期:" :value='data.borrowtime | f1' readonly :disableClear='true'></mt-field>
            <mt-field label="到期日期:" v-if='data.returntime' :value='data.returntime | f1' readonly :disableClear='true'></mt-field>
            <mt-field label="支付押金:" value='20经验值' readonly :disableClear='true'></mt-field>
        </div>
        <div>
            <div v-if='1 === data.borrowstatus'>
                <mt-field label="借阅状态:" :value='statusName' readonly :disableClear='true'></mt-field>
                <mt-field label="" readonly :disableClear='true'>
                    <span style='color: orange;'>请尽快至新大楼20楼xxx处领取，一周后还未领取，将自动取消借阅</span>
                </mt-field>
                <mt-button type='primary' size='large' style='margin-top: 20px;' @click='cancle'>取消借阅</mt-button>
            </div>
            <div v-else-if='2 === data.borrowstatus'>
                <mt-field label="借阅状态:" :value='statusName' readonly :disableClear='true'></mt-field>
                <mt-field label="剩余时间:" :value='remainDays' readonly :disableClear='true'></mt-field>
                <mt-field label="续借次数:" :value='data.renew' readonly :disableClear='true'></mt-field>
                <mt-button type='primary' size='large' style='margin-top: 20px;' @click='renew(data)' :disabled='0 === data.renew'>续借</mt-button>
            </div>
            <div v-else-if='3 === data.borrowstatus'>
                <mt-field label="借阅状态:" :value='statusName' readonly :disableClear='true'></mt-field>
                <mt-button type='primary' size='large' style='margin-top: 20px;' @click='comment'>评价</mt-button>
            </div>
            <div v-else-if='0 === data.borrowstatus || 4 === data.borrowstatus'>
                <mt-field label="借阅状态:" :value='statusName' readonly :disableClear='true'></mt-field>
                <mt-field label="过期天数:" :value='remainDays' readonly :disableClear='true'></mt-field>
                <mt-field label="扣除经验值:" :value='deductExp' readonly :disableClear='true'></mt-field>
            </div>
            <div v-else-if='8 === data.borrowstatus || 9 === data.borrowstatus'>
                <mt-field label="借阅状态:" :value='statusName' readonly :disableClear='true'></mt-field>
                <mt-field v-if='5 === data.borrowstatus' label="取消原因:" value='一周后未取书，系统自动取消借阅' readonly :disableClear='true'></mt-field>
            </div>
        </div>
    </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
import moment from 'moment'
export default {
    name: 'borrowDetails', //借阅详情
    data () {
        return {
            data: {
                title: "",
                borrowid: "",
                borrowtime: "",
                returntime: "",
                borrowstatus: ""
            }
        }
    },
    filters: {
        f1 (time) {
            if ('' === time) {
                return time;
            }
            return moment(+time).format('YYYY-MM-DD');
        }
    },
    computed: {
        remainDays() {
            moment.locale('zh-CN');
            return moment(+this.data.returntime).toNow(true);
        },
        deductExp() {
            moment.locale('zh-CN');
            return moment(+this.data.returntime).toNow(true).replace(/[\u4e00-\u9fa5]/, "");
        },
        //状态名称
        statusName() {
            let status = {
                0: "已过期",
                1: "待取书",
                2: "未还书",
                3: "待评价",
                4: "已还书",
                8: "已取消" /*被动取消*/,
                9: "已取消" /*主动取消*/
            };
            return status[this.data.borrowstatus];
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$axios.get('/api/user/borrowDetails', {
                params: {
                    borrow_id: this.$route.params.id
                }
            })
            .then((res) => {
                this.data = res.data;
            })
        },
        back () {
            this.$router.go(-1);
        },
        cancle () {
            MessageBox({
                title: '',
                message: '请确认一下哦~<br/>是否确认取消本次借阅？',
                showCancelButton: true,
                confirmButtonText: '是',
                cancelButtonText: '否'
            })
            .then(action => {
                if ("confirm" === action) {
                    this.$axios.post('/api/user/cancelBorrow', {
                        borrowInfo: {
                            borrow_id: this.data.borrowid
                        }
                    })
                    .then((res) => {
                        if (0 === res.data.code) {
                            //取消成功刷新借阅页面
                            this.$router.push('/borrow');
                        }
                        MessageBox({
                            title: '',
                            message: res.data.message,
                            confirmButtonText: '知道了'
                        })
                    })
                }
            })
        },
        //续借
        renew(data) {
            this.$axios.post('/api/user/renew', {
                borrowInfo: {
                borrow_id: data.borrowid
                }
            })
            .then((res) => {
                if (0 === res.data.code) {
                    this.$router.push('/borrow');
                }
                MessageBox({
                    title: '',
                    message: res.data.message,
                    confirmButtonText: '知道了'
                })
            })
        },
        comment() {
            //跳转到评论页面
            this.$router.push('/borrow/comment/'+ this.$route.params.id +'')
        }
    },
    beforeRouteLeave(to, from, next) {
      if ('borrow' === to.name) {
        to.meta.keepAlive = false;
      }
      next();
    },
    activated() {
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
.borrow-deader {
    position: relative;
}
// .mint-field{
//     & /deep/ .mint-cell-title {
//         width: 95px;
//         .mint-cell-text {
//             font-size: 15px;
//         }
//     }
//     & /deep/ .mint-cell-value {
//         text-align: left;
//         font-size: 15px;
//     }
// } 
</style>

