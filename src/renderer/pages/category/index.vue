<template>
    <div class="category">
        <el-card class="box-card">
            <el-dialog
                title="
                        Katalog o'zgartirish
                "
                :visible.sync="dialogEdit"
            >
                <el-form
                    :model="categoryEdit"
                    :rules="rulesEdit"
                    ref="ruleEdit"
                    label-width="200px"
                    class="demo-ruleForm"
                    label-position="top"
                >
                    <el-form-item label="Katalog nomi" prop="name">
                        <el-input v-model="categoryEdit.name"></el-input>
                    </el-form-item>
                </el-form>
                <div class="title-box-top">
                    <div class="title-top-left"></div>

                    <div class="title-box-right flex">
                        <el-button type="success" @click="editData('ruleEdit')">
                            Saqlash</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="
                        Katalog qo'shish
                "
                :visible.sync="dialogAdd"
            >
                <el-form
                    :model="category"
                    :rules="rulesAdd"
                    ref="ruleAdd"
                    label-width="200px"
                    class="demo-ruleForm"
                    label-position="top"
                >
                    <el-form-item label="Katalog nomi" prop="name">
                        <el-input v-model="category.name"></el-input>
                    </el-form-item>
                </el-form>
                <div class="title-box-top">
                    <div class="title-top-left"></div>

                    <div class="title-box-right flex">
                        <el-button type="success" @click="addData('ruleAdd')">
                            Saqlash</el-button
                        >
                    </div>
                </div>
            </el-dialog>

            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">Katalog</h4>
                </div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="dialogAdd = true">
                        <i class="el-icon-plus"></i> Katalog qo'shish</el-button
                    >
                </div>
            </div>
            <div class="table">
                <table v-if="tableData != null">
                    <thead>
                        <tr>
                            <th>Nomi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tableData" :key="item">
                            <td>
                                <div class="name"></div>
                                {{ item.name }}
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
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: {
                name: "",
            },
            categoryEdit: {
                name: "",
            },

            rulesAdd: {
                name: [
                    {
                        required: true,
                        message: "Katalog nomini kiriting",
                        trigger: "blur",
                    },
                ],
            },
            rulesEdit: {
                name: [
                    {
                        required: true,
                        message: "Katalog nomini kiriting",
                        trigger: "blur",
                    },
                ],
            },
            dialogAdd: false,
            dialogEdit: false,
            tableData: null,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        async openModalEdit(item) {
            this.dialogEdit = true;
            this.categoryEdit = item;
        },
        async getData() {
            let category = await this.$axios.get("category/all");
            this.tableData = category.data.data;
        },
        async addData(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post("category/add", this.category)
                        .then((res) => {
                            this.$message({
                                message: "Katalog qo'shildi",
                                type: "success",
                            });
                            this.getData();
                            this.dialogAdd = false;
                            this.category.name = "";
                        })
                        .catch((err) => {});
                }
            });
        },
        async editData(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .put(
                            `category/${this.categoryEdit._id}`,
                            this.categoryEdit
                        )
                        .then((res) => {
                            this.$message({
                                message: "Katalog o'zgartirildi",
                                type: "success",
                            });
                            this.getData();
                            this.dialogEdit = false;
                            this.categoryEdit.name = "";
                        })
                        .catch((err) => {});
                }
            });
        },
        async confirmDelete(id) {
            await this.$axios.delete("category/" + id).then((res) => {
                this.getData();
                this.$message({
                    message: "Katalog o'chirildi",
                    type: "success",
                });
            });
        },
    },
};
</script>
