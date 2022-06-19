import { createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const t = i18n.global.t

// 提交
export const commitArticle = async (data) => {
  console.log(data)
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}
// 编辑
export const editArticle = async (data) => {
  const res = await articleEdit(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
