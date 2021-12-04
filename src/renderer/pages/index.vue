<template>
    <div>
        <div class="dashboard" v-if="orders != null">
            <el-card class="box-card">
                <div class="title-box-top">
                    <div class="title-top-left">
                        <h4 class="title-page">Buyurtmalar</h4>
                    </div>
                </div>

                <div class="order-box">
                    <el-row :gutter="20">
                        <el-col
                            :span="6"
                            v-for="(item, index) in orders"
                            :key="index"
                            ><div><OrderCard :order="item" /></div
                        ></el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import OrderCard from "../components/OrderCard.vue";
export default {
    layout: "admin",
    components: {
        OrderCard,
    },
    data() {
        return {
            orders: null,
            viewProducts: null,
            page: 1,
            limit: 10,
            viewFull: false,
        };
    },

    async mounted() {
        let orders = await this.$axios.get("order/kassa/now");
        this.orders = orders.data.data;
    },
    methods: {
        changePagination() {},
        openFull(item) {
            this.viewProducts = item.product;
            this.viewFull = true;
        },
    },
};
</script>

<style lang="scss">
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin {
    margin-top: 10px;
    margin-bottom: 20px;
    .info {
        margin-bottom: 20px;
    }
    .card {
        border-radius: 5px;
        padding: 15px;
        width: calc((100% - 80px) / 4);
        .top {
            .stat {
                h1 {
                    margin: 0 !important;
                    color: #fff;
                    font-size: 38px;
                }
                span {
                    color: #fff;
                }
            }
        }
    }
    .c1 {
        background-color: #00c0ef !important;
    }
    .c2 {
        background-color: #00a65a !important;
    }
    .c3 {
        background-color: #f39c12 !important;
    }
    .c4 {
        background-color: #dd4b39 !important;
    }
}
</style>
