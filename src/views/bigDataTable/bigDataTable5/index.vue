<template>
    <div>
        <TreeGrid style="height:250px"
          :data="data" idField="id" treeField="name">
        <GridColumn field="ObjectName" title="ObjectName"></GridColumn>
        <GridColumn field="BelongTo" title="BelongTo"></GridColumn>
        <GridColumn field="CreateTime" title="CreateTime"></GridColumn>
        <GridColumn field="ResponsibleName" title="ResponsibleName"></GridColumn>
        <GridColumn field="Experience" title="Experience"></GridColumn>
        </TreeGrid>
    </div>
</template>
<script>
import dataJson from '../bigDataTable4/data.json'
    export default {
        data() {
            return {
                data: dataJson
            }
        }
    }
</script>