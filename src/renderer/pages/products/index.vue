<template>
    <div>
        <el-card class="box-card">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Mahsulotlar</h4>
                </div>

                <div class="title-box-right flex">
                    <div class="search flex" style="margin-right: 15px">
                        <form @submit.prevent="searchProduct">
                            <el-input
                                placeholder="Izlash"
                                v-model="filter.code"
                            >
                                <el-button
                                    slot="append"
                                    type="primary"
                                    icon="el-icon-search"
                                ></el-button
                            ></el-input>
                        </form>
                    </div>

                    <el-button type="success" @click="dialogFormVisible = true">
                        <i class="el-icon-plus"></i> Mahsulot
                        qo'shish</el-button
                    >
                </div>
            </div>

            <div class="filter-box">
                <el-row :gutter="20">
                    <el-col :span="16"
                        ><div class="grid-content bg-purple"></div
                    ></el-col>
                    <el-col :span="8"
                        ><div class="grid-content bg-purple"></div
                    ></el-col>
                </el-row>
            </div>
            <div v-if="tableData != null">
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Nomi</th>
                                <th>Turi</th>
                                <th>Narxi</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData" :key="item">
                                <td>
                                    {{ item.title }}
                                </td>
                                <td>{{ item.category.name }}</td>
                                <td>
                                    {{ item.price }}
                                </td>
                                <td>
                                    <el-switch
                                        v-model="item.status"
                                        @change="changeStatus(item)"
                                    >
                                    </el-switch>
                                </td>

                                <td>
                                    <div class="table-actions">
                                        <el-button
                                            @click="openModalEdit(item)"
                                            type="primary"
                                            icon="el-icon-edit"
                                            size="mini"
                                            plain
                                            class="edit"
                                        ></el-button>

                                        <el-popconfirm
                                            title="Ma`lumotni o'chirmoqchimisiz?"
                                            confirm-button-text="Ha"
                                            cancel-button-text="Yo'q"
                                            cancel-button-type="danger"
                                            @confirm="confirmDelete(item._id)"
                                        >
                                            <el-button
                                                slot="reference"
                                                type="danger"
                                                icon="el-icon-delete"
                                                size="mini"
                                                plain
                                            ></el-button>
                                        </el-popconfirm>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="pagination">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="length"
                        :page-size="filter.limit"
                        :current-page="filter.page"
                        @current-change="changePagination"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <el-dialog title="Mahsulot qo'shish" :visible.sync="dialogFormVisible">
            <el-form
                :model="product"
                :rules="rules"
                ref="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content">
                            <el-form-item label="Mahsulot nomi" prop="title">
                                <el-input v-model="product.title"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Status" prop="status">
                            <el-switch v-model="product.status"></el-switch>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Mahsulot narxi" prop="price">
                            <el-input
                                v-mask="'############'"
                                v-model="product.price"
                            >
                                <el-button slot="append">so'm</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="Katalog"
                            prop="category"
                            v-if="category != null"
                        >
                            <el-select
                                v-model="product.category"
                                placeholder="Mahsulot katalogini tanlang"
                            >
                                <el-option
                                    v-for="(item, index) in category"
                                    :key="index"
                                    :label="item.name"
                                    :value="item._id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"
                    >Bekor qilish</el-button
                >
                <el-button type="success" @click="submitForm('ruleForm')"
                    >Saqlash</el-button
                >
            </span>
        </el-dialog>

        <el-dialog title="Mahsulotni o'zgartirish" :visible.sync="dialogEdit">
            <el-form
                :model="productEdit"
                :rules="rulesEdit"
                ref="ruleFormEdit"
                label-width="200px"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div class="grid-content">
                            <el-form-item label="Mahsulot nomi" prop="title">
                                <el-input
                                    v-model="productEdit.title"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Status" prop="status">
                            <el-switch v-model="productEdit.status"></el-switch>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Mahsulot narxi" prop="price">
                            <el-input
                                v-mask="'############'"
                                v-model="productEdit.price"
                            >
                                <el-button slot="append">so'm</el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="Katalog"
                            prop="category"
                            v-if="category != null"
                        >
                            <el-select
                                v-model="productEdit.category"
                                placeholder="Mahsulot katalogini tanlang"
                            >
                                <el-option
                                    v-for="(item, index) in category"
                                    :key="index"
                                    :label="item.name"
                                    :value="item._id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">Bekor qilish</el-button>
                <el-button type="success" @click="submitEdit('ruleFormEdit')"
                    >O'zgartirish</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
let { remote } = require("electron");
// console.log(process.versions.electron);
const { PosPrinter } = remote.require("electron-pos-printer");
export default {
    data() {
        return {
            search: "",
            activeName: "first",
            dialogFormVisible: false,
            dialogEdit: false,
            category: null,
            tableData: null,

            filter: {
                page: 1,
                limit: 10,
                code: "",
            },

            length: 0,

            product: {
                title: "",
                price: "",
                category: "",
                status: true,
            },
            productEdit: {
                _id: "",
                title: "",
                price: "",
                category: "",
                status: true,
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                category: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "change",
                    },
                ],
                // code: [
                //     {
                //         required: true,
                //         message: "To'ldirilishi shart",
                //         trigger: "blur",
                //     },
                // ],
            },
            rulesEdit: {
                title: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                category: [
                    {
                        required: true,
                        message: "To'ldirilishi shart",
                        trigger: "change",
                    },
                ],
                // code: [
                //     {
                //         required: true,
                //         message: "To'ldirilishi shart",
                //         trigger: "blur",
                //     },
                // ],
            },
        };
    },

    async mounted() {
        this.getData();

        let category = await this.$axios.get("category/all");
        this.category = category.data.data;
    },

    methods: {
        searchProduct() {
            this.getData();
        },
        generateCode() {
            let timestamp = new Date().getTime();

            this.product.code = timestamp;
        },
        async getData() {
            let products = await this.$axios.post("product/all", this.filter);
            this.tableData = products.data.data;
            this.length = products.data.count;
        },
        goBack() {
            this.$router.go(-1);
        },
        openModalEdit(item) {
            this.productEdit._id = item._id;
            this.productEdit.title = item.title;
            this.productEdit.price = item.price;
            this.productEdit.category = item.category._id;
            this.productEdit.status = item.status;
            this.dialogEdit = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post("product/add", this.product)
                        .then((res) => {
                            console.log(res);
                            this.product.title = "";
                            this.product.category = "";
                            this.product.price = "";
                            this.product.status = true;

                            this.getData();
                            this.$message({
                                message: "Mahsulot qo'shildi",
                                type: "success",
                                showClose: true,
                            });

                            this.dialogFormVisible = false;
                        })
                        .catch((err) => {
                            console.log("error->", err);
                            this.$message({
                                message: "Mahsulot mavjud yoki boshqa xatolik",
                                type: "success",
                                showClose: true,
                            });
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        submitEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .put(
                            "product/" + this.productEdit._id,
                            this.productEdit
                        )
                        .then((res) => {
                            this.getData();
                            this.$message({
                                message: "Mahsulot o'zgartirildi",
                                type: "success",
                                showClose: true,
                            });

                            this.dialogEdit = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        // reset form validation
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        changeStatus(item) {
            this.$axios.put("product/" + item._id, {
                status: item.status,
            });
        },

        confirmDelete(id) {
            this.$axios.delete(`product/${id}`).then((res) => {
                this.getData();
                this.$message({
                    message: "Ma`lumot o'chirildi",
                    type: "success",
                    showClose: true,
                });
            });
        },
        changePagination(page) {
            this.filter.page = page;
            this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
}
</style>
