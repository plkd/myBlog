/* eslint-disable */

export function sub(obj, res) {
  obj.btnText = '提交';
  obj.loadingFlag = false;
  if (res.data.code === 200) {
    obj.$notify({
      title: '成功',
      message: '提交成功',
      type: 'success'
    })
  } else if (res.data.code === 401) {
    obj.$notify({
      title: '失败',
      message: 'failed',
      type: 'error'
    })
    setTimeout(() => {
      obj.$router.replace({path: '/login'})
    }, 500);
    return false;
  } else if (res.data.code === -200) {
    obj.$notify({
      title: '失败',
      message: res.data.message,
      type: 'error'
    })
  }
  obj.formVisible = false;
  obj.getLists();
}
