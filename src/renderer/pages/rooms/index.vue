<template>
    <div class="table">
        <el-card class="box-card">
            <el-dialog
                title="
                        Stol o'zgartirish
                "
                :visible.sync="dialogEdit"
            >
                <el-form
                    :model="tableEdit"
                    :rules="rulesEdit"
                    ref="ruleEdit"
                    label-width="200px"
                    class="demo-ruleForm"
                    label-position="top"
                >
                    <el-form-item label="Stol raqami" prop="name">
                        <el-input v-model="tableEdit.number"></el-input>
                    </el-form-item>
                    <el-form-item label="Stol sig'imi" prop="size">
                        <el-input v-mask="'#######'" v-model="tableEdit.size">
                            <el-button slot="append">ta odam</el-button>
                        </el-input>
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
                        Stol qo'shish
                "
                :visible.sync="dialogAdd"
            >
                <el-form
                    :model="table"
                    :rules="rulesAdd"
                    ref="ruleAdd"
                    label-width="200px"
                    class="demo-ruleForm"
                    label-position="top"
                >
                    <el-form-item label="Stol raqami" prop="name">
                        <el-input v-model="table.number"></el-input>
                    </el-form-item>
                    <el-form-item label="Stol sig'imi" prop="size">
                        <el-input v-mask="'#######'" v-model="table.size">
                            <el-button slot="append">ta odam</el-button>
                        </el-input>
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
                    <h4 class="title-page">Stol</h4>
                </div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="dialogAdd = true">
                        <i class="el-icon-plus"></i> Stol qo'shish</el-button
                    >
                </div>
            </div>
            <div class="table">
                <table v-if="tableData != null">
                    <thead>
                        <tr>
                            <th>Raqami</th>
                            <th>Sig'imi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            style="border-bottom: 1px solid"
                            v-for="item in tableData"
                            :key="item"
                        >
                            <td>
                                <div class="name"></div>
                                {{ item.number }}
                            </td>
                            <td>{{ item.size }}</td>
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
            table: {
                number: "",
                size: "",
            },
            tableEdit: {
                number: "",
                size: "",
            },

            rulesAdd: {
                number: [
                    {
                        required: true,
                        message: "Stol nomini kiriting",
                        trigger: "blur",
                    },
                ],
                size: [
                    {
                        required: true,
                        message: "Stol sig'imini kiriting",
                        trigger: "blur",
                    },
                ],
            },
            rulesEdit: {
                number: [
                    {
                        required: true,
                        message: "Stol nomini kiriting",
                        trigger: "blur",
                    },
                ],
                size: [
                    {
                        required: true,
                        message: "Stol sig'imini kiriting",
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
            this.tableEdit = item;
        },
        async getData() {
            let table = await this.$axios.get("table/all");
            this.tableData = table.data.data;
        },
        async addData(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .post("table/add", this.table)
                        .then((res) => {
                            this.$message({
                                message: "Stol qo'shildi",
                                type: "success",
                            });
                            this.getData();
                            this.dialogAdd = false;
                            this.table.name = "";
                        })
                        .catch((err) => {});
                }
            });
        },
        async editData(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios
                        .put(`table/${this.tableEdit._id}`, this.tableEdit)
                        .then((res) => {
                            this.$message({
                                message: "Stol o'zgartirildi",
                                type: "success",
                            });
                            this.getData();
                            this.dialogEdit = false;
                            this.tableEdit.name = "";
                        })
                        .catch((err) => {});
                }
            });
        },
        async confirmDelete(id) {
            await this.$axios.delete("table/" + id).then((res) => {
                this.getData();
                this.$message({
                    message: "Stol o'chirildi",
                    type: "success",
                });
            });
        },
    },
};
</script>
