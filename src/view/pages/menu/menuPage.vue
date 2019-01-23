<template>
    <div class="demo-split">
        <Split v-model="initSplitRatio" min="300px">     
            <div slot="left" class="demo-split-pane">
                Left Pane
            </div>
            <div slot="right" class="demo-split-pane"> 
                Right Pane
            </div>
        </Split>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                initSplitRatio: 0.2
            }
        },
    }
</script>
<style>
    .demo-split{
        height: 100%;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>
