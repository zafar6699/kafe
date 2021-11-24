<template>
    <div>
        <div class="admin">
            <div class="cards flex">
                <div class="card c1">
                    <div class="top flex">
                        <div class="stat">
                            <h1>50</h1>
                            <span>New Orders</span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
                <div class="card c2">
                    <div class="top flex">
                        <div class="stat">
                            <h1>50</h1>
                            <span>New Orders</span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
                <div class="card c3">
                    <div class="top flex">
                        <div class="stat">
                            <h1>50</h1>
                            <span>New Orders</span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
                <div class="card c4">
                    <div class="top flex">
                        <div class="stat">
                            <h1>50</h1>
                            <span>New Orders</span>
                        </div>
                        <div class="icon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "admin",
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.admin {
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
