<template>
  <div>
    <vxe-table :data="tableData">
      <vxe-column field="id" title="ID"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AxiosResponse } from "axios";
import { getAllData } from "../api/api";
import { resultModel,DataModel } from "../model/model";
export default defineComponent({
  setup() {
    const tableData = ref<DataModel>();
     getAllData()
      .then((res:AxiosResponse<resultModel>) => {
        if(res.data.isSuccess){
          tableData.value = res.data.data;
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
    return {
      tableData,
    };
  },
});
</script>