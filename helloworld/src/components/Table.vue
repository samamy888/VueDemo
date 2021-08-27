<template>
  <div>
    <p>
      <vxe-button
        content="查詢"
        status="primary"
        @click="searchEvent()"
      ></vxe-button>
      <vxe-button
        content="新增"
        status="success"
        @click="openModal()"
      ></vxe-button>
    </p>
    <p>
      <vxe-table :data="tableData">
        <vxe-column field="id" title="ID"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
      </vxe-table>
    </p>
    <vxe-modal id="AddModal" v-model="modal.value" :title="modal.title">
      <vxe-form :data="formData" @submit="addEvent()" :rules="formRule">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formData.name"  placeholder="Name"></vxe-input>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <vxe-button
            content="新增"
            status="success"
            type="submit"
          ></vxe-button>
        </vxe-form-item>
      </vxe-form>
    </vxe-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { AxiosResponse } from "axios";
import { addData, getAllData } from "../api/api";
import { resultModel, DataModel } from "../model/model";
import VXETable from 'vxe-table'
export default defineComponent({
  setup() {
    const tableData = ref<DataModel>();
    const formData = ref<DataModel>({
      id: 0,
      name: "",
    });
    const modal = ref({
      value: false,
      title: "新增資料",
    });
    const formRule = ref({
      name: [{ required: true, message: "请输入名称" }],
    });
    onMounted(() => {
      searchEvent();
    });
    const searchEvent = () => {
      getAllData()
        .then((res: AxiosResponse<resultModel>) => {
          if (res.data.isSuccess) {
            tableData.value = res.data.data;
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    const openModal = () => {
      modal["value"].value = true;
    };
    const addEvent = () => {
      console.log(VXETable.modal.close('AddModal'));
      addData(formData.value as DataModel)
        .then((res: AxiosResponse<resultModel>) => {
          if (res.data.isSuccess) {
            alert("新增成功");
            searchEvent();
          }else{
            alert("新增失敗");
          }

        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    return {
      tableData,
      searchEvent,
      addEvent,
      openModal,
      modal,
      formData,
      formRule,
    };
  },
});
</script>