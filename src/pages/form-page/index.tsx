import {Button, Form, FormProps, Input, InputNumber, Space, Upload} from "antd";
import React, {useState, useEffect} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {ProductDomainType} from "../../state/products-reducer";
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {useAppSelector} from "../../hooks/use-app-selector";
import {ProductType} from "../../api/card-api";
import { useNavigate } from "react-router-dom";
import { createProduct, selectAllProducts, updateProduct } from "../../state/products-reducer";

type FieldType = {
    title: string;
    category: string;
    description: string;
    price: number;
    count: number;
};

interface FormPageProps {
    productToEdit?: ProductDomainType;  // Optional prop to pass a product for editing
}

export const FormPage: React.FC<FormPageProps> = ({productToEdit}) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectAllProducts);
    const navigate = useNavigate()

    const [fileBase64, setFileBase64] = useState<string | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);

    // If productToEdit is provided, populate the form with the existing product data
    useEffect(() => {
        if (productToEdit) {
            form.setFieldsValue({
                title: productToEdit.title,
                category: productToEdit.category,
                description: productToEdit.description,
                price: productToEdit.price,
                count: productToEdit.rating.count,
            });
            setFileBase64(productToEdit.image);
            setFileList([{uid: `${Date.now()}`, name: 'image.jpg', status: 'done', url: productToEdit.image}]);
        }
    }, [productToEdit, form]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if (productToEdit) {
            const updatedProduct: ProductDomainType = {
                ...productToEdit,
                image: fileBase64 ?? '',
                price: values.price,
                category: values.category,
                title: values.title,
                description: values.description,
                rating: {rate: 0, count: values.count},
            };
            dispatch(updateProduct(updatedProduct));
        } else {
            const newProduct: ProductType = {
                id: products?.length + 1,
                image: fileBase64 ?? '',
                price: values.price,
                category: values.category,
                title: values.title,
                description: values.description,
                rating: {rate: 0, count: values.count}
            };
            dispatch(createProduct(newProduct));
        }

        form.resetFields();
        setFileBase64(null);
        setFileList([]);
        navigate("/")
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleBeforeUpload = async (file: File) => {
        const base64 = await getBase64(file);
        setFileBase64(base64);
        setFileList([{uid: `${Date.now()}`, name: file.name, status: 'done', url: base64}]);
        return false;
    };

    const handleRemove = () => {
        setFileBase64(null);
        setFileList([]);
    };

    return (
        <Space
            direction="horizontal"
            size="middle"
            wrap
            style={{
                justifyContent: "center",
                width: "100%",
                padding: "20px",
            }}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Заголовок"
                    name="title"
                    rules={[{required: true, message: 'Введите заголовок!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Категория"
                    name="category"
                    rules={[{required: true, message: 'Укажите название категории!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Описание"
                    name="description"
                    rules={[{required: true, message: 'Введите описание!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Цена"
                    name="price"
                    rules={[{required: true, message: 'Укажите цену!'}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Остаток"
                    name="count"
                    rules={[{required: true, message: 'Укажите остаток!'}]}
                >
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Фото">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={handleBeforeUpload}
                        onRemove={handleRemove}
                        maxCount={1}
                        showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                    >
                        {fileList.length === 0 && (
                            <button style={{border: 0, background: 'none'}} type="button">
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </button>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        {productToEdit ? 'Update' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    );
};
