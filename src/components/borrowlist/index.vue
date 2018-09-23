<template>
    <div class='borrow-list-wrapper'>
      <div class='borrow-main'>
          <div class='book-photo'>
              <img :src='data.image' />
          </div>
          <div class='book-title'>
              <h1>{{data.title}}</h1>
          </div>
          <div class='borrow-status'>
              <span>{{data.borrowstatus | f4}}</span>
          </div>
          <div class='book-author'>
              作者：{{data.author}}
          </div>
          <div class='start-time'>
              <span>{{data.borrowtime | f1}}</span>
          </div>
      </div>
      <div class='borrow-footer'>
          <span v-html='$options.filters.f2(data)' class='borrow-tips'></span>
          <mt-button v-if='data.borrowstatus === 1 || data.borrowstatus === 2 || data.borrowstatus === 3' type="primary" size='small' class='borrow-operate' @click.stop='btnClick(data)'>{{data.borrowstatus | f3}}</mt-button>
      </div>
  </div>

</template>
<script>
import {MessageBox} from 'mint-ui'
import moment from "moment";
export default {
  name: "borrowList", //借阅列表
  props: {
    data: Object
  },
  filters: {
    //时间格式化
    f1(val) {
      if ('' === val) {
        return  val;
      }
      return moment(+val).format("YYYY-MM-DD");
    },
    //
    f2(data) {
      let diff = 0;
      if (2 === data.borrowstatus) {
        diff = Math.floor((data.returntime - Date.now()) / (1000 * 60 * 60 * 24));
        return (
          ' 还有<b style="color: red;">' +
          diff
          +
          "</b>天到期（过期1天=1经验值）"
        );
      } else if(0 === data.borrowstatus) {
          //let diff = Math.ceil((Date.now() - time) / (1000 * 60 * 60 * 24));
          let diff = Math.abs(data.timeout_days);
          return '<span style="color:red;">过期天数：'+ diff +'天，扣除经验值：'+ diff +'</span>'
      } else if (8 === data.borrowstatus) {
          return '<span style="color:orange";>超过一周未取书，系统自动取消借阅</span>'
      }
    },
    //根据借阅状态显示按钮名称
    f3 (status) {
      switch(status) {
        case 1: 
          return '取消';
          break;
        case 2:
          return '续借' ;
          break;
        case 3:
          return '评价';
          break;
        // case 4:
        // case 8:
        // case 9:
        //   return '删除记录';
        //   break;
        default: break;
      }
    },
    //返回借阅状态名称
    f4 (val) {
      let status = {
        0: "已过期",
        1: "待取书",
        2: "未还书",
        3: "待评价",
        4: "已还书",
        8: "已取消" /*被动取消*/,
        9: "已取消" /*主动取消*/
      }
      return status[val];
    }
  },
  methods: {
    //取消、续借、评价(暂无删除记录)事件回调
    btnClick (data) {
      switch(data.borrowstatus) {
        case 1: 
          this.cancel(data);
          break;
        case 2:
          this.renew(data);
          break;
        case 3:
          this.comment(data);
          break;
        case 4:
        case 8:
        case 9:
          this.deleteRecord(data);
          break;
        default: break;
      }
    },
    //借阅取消
    cancel (data) {
      MessageBox({
          title: '',
          message: '真的要取消吗？<br/>取消后，系统自动退回20经验值！',
          showCancelButton: true,
          confirmButtonText: '是',
          cancelButtonText: '否'
      })
      .then(action => {
          if ("confirm" === action) {
            this.$axios.post('/api/user/cancelBorrow', {
              borrow_id: data.borrowid
            })
            .then((res) => {
              if (0 === res.data.code) {
                this.$emit('refresh');
              }
              MessageBox({
                title: '',
                message: res.data.message,
                confirmButtonText: '知道了'
              })
            });
          }
      })
    },
    //图书续借
    renew (data) {
      this.$axios.post('/api/user/renew', {
        borrow_id: data.borrowid
      })
      .then((res) => {
        if (0 === res.data.code) {
          //续借成功触发刷新事件
          this.$emit('refresh');
        }
        MessageBox({
          title: '',
          message: res.data.message,
          confirmButtonText: '知道了'
        })
      })
    },
    //跳转到评价页面
    comment (data) {
      this.$router.push('/borrow/comment/'+ this.data.borrowid +'')
    },
    //删除记录事件回调(暂时不用)
    deleteRecord (data) {
      MessageBox({
          title: '',
          message: '请确认一下哦~<br/>是否确认删除借阅记录？',
          showCancelButton: true,
          confirmButtonText: '是',
          cancelButtonText: '否'
      })
      .then(action => {
          if('confirm' === action) {
            this.$axios.delete('/api/admin/borrow', {
              params: {
                borrow_id: data.borrowid
              }
            })
            .then((res) => {
              if (0 === res.data.code) {
                this.$emit('refresh');
              }
              MessageBox({
                title: '',
                message: res.data.message,
                confirmButtonText: '知道了'
              })
            })
          }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.borrow-list-wrapper {
  background-color: $White;
  .borrow-main {
    display: grid;
    grid-template-columns: 80px 1fr 70px;
    grid-template-rows: 45px 45px;
    color: $Oslo-Gray;
    align-items: center;
    .book-photo {
      grid-row: 1 / 3;
      padding: 5px 0.1852rem;
      img {
        width: 100%;
        height: 80px;
      }
    }
    .book-title {
      h1 {
        color: $Black;
        font-size: 16px;
      }
    }
  }
  .borrow-footer {
    height: 35px;
    line-height: 35px;
    span {
      margin-left: 0.1852rem;
    }
    .borrow-operate {
      float: right;
      width: 80px;
      margin-right: 0.0926rem;
    }
  }
}

</style>


