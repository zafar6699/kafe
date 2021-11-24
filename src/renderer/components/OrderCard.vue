<template>
    <div>
        <el-dialog title="Buyurtma" :visible.sync="dialogFull">
            <div class="modal-mody">
                <div class="modal-top">
                    <div class="item">
                        <h4>Stol:</h4>
                        <h3>3</h3>
                    </div>
                    <div class="item">
                        <h4>Ofitsiant:</h4>
                        <h3>Zafar</h3>
                    </div>
                </div>

                <div class="modal-products">
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                    <div class="pr-item">
                        <h4>Mujskoy kapriz --- <span>3</span> x 18000</h4>
                        <h5>54000 so'm</h5>
                    </div>
                </div>

                <div class="price-all">
                    <h4>Jami:</h4>
                    <h3>450000 so'm</h3>
                </div>

                <div class="modal-actions">
                    <el-button type="primary">Buyurtmani yopish</el-button>
                </div>
            </div>
        </el-dialog>

        <div class="order-card" @click="dialogFull = true">
            <div class="top">
                <div class="number">
                    <h2>3</h2>
                </div>
                <h3>Muhammadali</h3>
            </div>

            <div class="products-chip">
                <el-tag size="medium">Somsa x3</el-tag>
                <el-tag size="medium">Tovuqli qozon kabob x3</el-tag>
                <el-tag size="medium">Mol go'shtli qozon kabob x3</el-tag>
                <el-tag size="medium">Saryo'ga tovuq x3</el-tag>
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
    data() {
        return {
            dialogFull: false,
        };
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
