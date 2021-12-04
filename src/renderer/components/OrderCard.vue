<template>
    <div>
        <el-dialog
            title="Buyurtma"
            :visible.sync="dialogFull"
            v-if="dialogFull"
        >
            <div class="modal-mody">
                <div class="modal-top">
                    <div class="item">
                        <h4>Stol:</h4>
                        <h3>{{ orderFull.table.number }}</h3>
                    </div>
                    <div class="item">
                        <h4>Ofitsiant:</h4>
                        <h3>{{ orderFull.waiter.user.name }}</h3>
                    </div>
                </div>

                <div class="modal-products">
                    <div
                        class="pr-item"
                        v-for="(item, index) in orderFull.products"
                        :key="index"
                    >
                        <h4>
                            {{ item.title }} ---
                            <span> {{ item.count }} </span> x {{ item.price }}
                        </h4>
                        <h5>{{ item.count * item.price }} so'm</h5>
                    </div>
                </div>

                <div class="price-all">
                    <h4>Jami:</h4>
                    <h3>{{ allSum }} so'm</h3>
                </div>

                <div class="modal-actions">
                    <el-button type="primary" @click="endOrder"
                        >Buyurtmani yopish</el-button
                    >
                </div>
            </div>
        </el-dialog>

        <div class="order-card" @click="clickOrder(order)">
            <div class="top">
                <div class="number">
                    <h2>{{ order.table.number }}</h2>
                </div>
                <h3>{{ order.waiter.user.name }}</h3>
            </div>

            <div class="products-chip">
                <el-tag
                    size="medium"
                    v-for="(item, index) in order.products"
                    :key="index"
                    v-if="index < 3"
                >
                    {{ item.title }} x {{ item.count }}
                </el-tag>
            </div>
        </div>
    </div>
</template>

<script>
let { remote } = require("electron");
// console.log(process.versions.electron);
const { PosPrinter } = remote.require("electron-pos-printer");

import axios from "axios";
export default {
    props: {
        order: {
            type: Object,
        },
    },
    data() {
        return {
            dialogFull: false,
            orderFull: {},
            date: "",
            clock: "",
        };
    },
    mounted() {
        setInterval(() => {
            let date = new Date();

            let hour, minute, second, day, month, year;

            hour = date.getHours();
            minute = date.getMinutes();
            second = date.getSeconds();
            day = date.getDate();
            month = parseInt(date.getMonth()) + 1;

            year = date.getFullYear();

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            if (day < 10) {
                day = "0" + day;
            }
            month = parseInt(month);
            if (month < 10) {
                month = "0" + month;
            }

            this.clock = hour + ":" + minute + ":" + second;

            this.date = day + "." + month + "." + year;
        }, 1000);
    },
    computed: {
        allSum() {
            let s = 0;
            this.orderFull.products.forEach((item) => {
                s = s + item.price * item.count;
            });
            return s;
        },
    },
    methods: {
        clickOrder(order) {
            this.orderFull = order;
            this.dialogFull = true;
        },
        async endOrder() {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            await this.$axios
                .put(`order/${this.order._id}`, { status: 1 })
                .then(() => {
                    let pr = [];

                    this.orderFull.products.forEach((item) => {
                        pr.push({
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: item.title,
                            css: {
                                "font-weight": "450",
                                "font-size": "11px",
                                margin: "0",
                                "word-break": "break-all",
                                "font-family":
                                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            },
                        });

                        pr.push({
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `${item.count} x ${item.price} = ${
                                item.price * item.count
                            }`,
                            css: {
                                "font-weight": "450",
                                "text-align": "right",
                                "font-size": "11px",
                                "border-bottom": "1px solid #333",
                                margin: "0",
                                "word-break": "break-all",
                                "font-family":
                                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                            },
                        });
                    });

                    const data = [
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: "AZIZLAR MARKET",
                            style: `text-align:center;`,
                            css: {
                                "font-weight": "600",
                                "font-size": "13px",
                                border: "1px solid #333",
                                margin: "0",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Chek nomeri: №${this.orderFull.order}`,
                            style: `text-align:center;`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                margin: "0",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Vaqt: ${this.date} ${this.clock.substr(
                                0,
                                5
                            )}`,
                            style: `text-align:center;`,
                            css: {
                                "font-weight": "600",
                                "font-size": "12px",
                                margin: "0px 0px 25px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                        ...pr,
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Jami: ${this.allSum}`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                "text-align": "right",
                                margin: "0px 0px 0px 0px",
                                "font-family": "sans-serif",
                            },
                        },

                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Sotuvchi:`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                margin: "10px 0px 0px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `${this.$store.state.user.name}`,
                            css: {
                                "font-weight": "600",
                                "font-size": "12px",
                                margin: "0px 0px 5px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `Xaridingiz uchun rahmat`,
                            css: {
                                "font-weight": "500",
                                "font-size": "12px",
                                "text-align": "center",
                                margin: "15px 0px 35px 0px",
                                "font-family": "sans-serif",
                            },
                        },

                        {
                            type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                            value: `------------`,
                            css: {
                                "font-weight": "500",
                                "font-size": "14px",
                                "text-align": "center",
                                margin: "0px 0px 0px 0px",
                                "font-family": "sans-serif",
                            },
                        },
                    ];
                    PosPrinter.print(data, {
                        preview: false, // Preview in window or print
                        width: 155, //  width of content body
                        margin: "0 0 0 0", // margin of content body
                        copies: 1, // Number of copies to print
                        printerName: "XP-58", // printerName: string, check it at webContent.getPrinters()
                        timeOutPerLine: 400,
                        silent: true,
                    })
                        .then(() => {
                            loading.close();
                            this.dialogFull = false;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
        },
    },
};
</script>

<style lang="scss" scoped>
div.modal-top {
    display: flex;
    justify-content: space-between;
    div.item {
        display: flex;
        align-items: center;
        h3 {
            font-size: 24px;
            color: #000;
        }
        h4 {
            font-weight: 500;
            font-size: 20px;
            margin-right: 15px;
        }
    }
}
div.modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    button {
        font-size: 24px;
    }
}
div.modal-products {
    margin: 20px 0px;
    max-height: 300px;
    overflow-y: scroll;
    padding: 0px 10px;
    div.pr-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 3px 0px;
        margin-bottom: 5px;
        h4 {
            font-size: 14px;
            color: #000;
            font-weight: 400;
            span {
                color: #409eff;
            }
        }
        h5 {
            font-size: 18px;
            font-weight: 500;
            color: #409eff;
        }
    }
}

div.price-all {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
        font-size: 18px;
        font-weight: 400;
        margin-right: 15px;
    }
    h3 {
        font-size: 24px;
        color: #333;
        font-weight: 500;
    }
}
div.modal-products::-webkit-scrollbar {
    width: 5px;
}

/* Track */
div.modal-products::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
div.modal-products::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
div.modal-products::-webkit-scrollbar-thumb:hover {
    background: #555;
}
div.order-card {
    border-radius: 5px;
    border: 1px solid #ccc;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 20px;
    transition: 0.3s;
    &:hover {
        box-shadow: 0px 0px 15px rgba($color: #000000, $alpha: 0.2);
    }
    div.top {
        display: flex;
        align-items: center;
        div.number {
            width: 80px;
            height: 80px;
            background-color: #409eff;
            margin-right: 15px;
            h2 {
                font-size: 50px;
                text-align: center;
                color: #fff;
            }
        }
        h3 {
            font-size: 22px;
            font-weight: 500;
        }
    }
    div.products-chip {
        padding: 15px;
        height: 80px;
        overflow: hidden;
        .el-tag {
            margin-bottom: 5px !important;
        }
    }
}
</style>
