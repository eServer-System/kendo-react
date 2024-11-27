import * as React from "react";
import {
  chevronLeftIcon,
  trashIcon,
  walletSolidIcon,
  heartIcon,
  percentIcon,
} from "@progress/kendo-svg-icons";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { useCart } from "../helpers/CartContext";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import shoppingCartImage from "../assets/shoppingCartImg.png";
import { Avatar } from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { useLanguageContext } from "../helpers/LanguageContext";

const EmailInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...others} labelClassName={"k-form-label"} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export const ShoppingCartList: React.FC = () => {
  const { cart, updateIndividualCartItem } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguageContext();

  const onBackClick = () => {
    navigate("/products");
  };

  const onProceedClick = () => {
    navigate("/paymentdetails");
  };

  const updateQuantity = (event: any) => {
    const target = event.target.element;
    const id = target.getAttribute("id");

    updateIndividualCartItem(id);
  };

  return (
    <>
      <Layout>
        <div className="k-h2 k-font-bold k-text-black k-col-span-12 k-pt-5">
          {t.shoppingCartTitle}
        </div>
        <div className="k-pb-5">
          <Button
            svgIcon={chevronLeftIcon}
            fillMode={"flat"}
            onClick={onBackClick}
          >
            {t.backButtonText}
          </Button>
        </div>

        {cart.map((item) => {
          const isCartItem = "quantity" in item;

          return (
            <div
              className="k-d-flex k-gap-5 k-justify-content-center k-border-y k-align-items-center k-pb-5"
              key={item.product.id}
              style={{
                height: "120px",
              }}
            >
              <img
                className="k-rounded-lg"
                src={isCartItem ? item.product.img : undefined}
                alt={isCartItem ? item.product.title : undefined}
                style={{
                  maxHeight: "120px",
                }}
              />
              <div className="k-d-flex k-justify-content-between k-w-full">
                <span>{isCartItem ? item.product.title : null}</span>
                <span>{`$${isCartItem ? item.product.newPrice.toLocaleString() : null}`}</span>
                <span>
                  {isCartItem ? (
                    <NumericTextBox
                      value={item.quantity}
                      id={String(item.product.id)}
                      onChange={updateQuantity}
                      width={"118px"}
                      fillMode={"flat"}
                    />
                  ) : (
                    <span>{t.emptyCartMessage}</span>
                  )}
                  <Button svgIcon={trashIcon} fillMode={"flat"}></Button>
                </span>
                <span>
                  {`$${(
                    item.quantity * item.product.newPrice
                  ).toLocaleString()}`}
                </span>
              </div>
            </div>
          );
        })}
      </Layout>
      {cart.length > 0 ? (
        <Layout>
          <section className="k-d-flex k-justify-content-between k-align-items-center">
            <div className="k-col-span-3">
              <Form
                render={() => (
                  <FormElement style={{ maxWidth: 650 }}>
                    <fieldset className={"k-form-fieldset"}>
                      <legend className={"k-h2"}>{t.paymentDetailsTitle}</legend>
                      <span>{t.paymentDetailsSubtitle}</span>
                      <FieldWrapper>
                        <Field
                          name={"firstName"}
                          component={Input}
                          labelClassName={"k-form-label"}
                          label={t.fullNameLabel}
                        />
                      </FieldWrapper>

                      <FieldWrapper>
                        <Field
                          name={"email"}
                          type={"email"}
                          component={EmailInput}
                          label={t.emailLabel}
                        />
                      </FieldWrapper>

                      <FieldWrapper>
                        <Field
                          name={"phone"}
                          component={Input}
                          labelClassName={"k-form-label"}
                          label={t.phoneNumberLabel}
                        />
                      </FieldWrapper>

                      <FieldWrapper>
                        <Field
                          name={"country"}
                          component={Input}
                          labelClassName={"k-form-label"}
                          label={t.shippingMethodLabel}
                        />
                      </FieldWrapper>

                      <FieldWrapper>
                        <Field
                          name={"street"}
                          component={Input}
                          labelClassName={"k-form-label"}
                          label={t.giftWrappingLabel}
                        />
                      </FieldWrapper>
                    </fieldset>
                    <div className="k-form-buttons">
                      <Button
                        themeColor={"primary"}
                        size={"large"}
                        onClick={onProceedClick}
                      >
                        {t.proceedToCheckoutButtonText}
                      </Button>
                    </div>
                  </FormElement>
                )}
              />
            </div>
            <div
              className="k-col-span-9 k-rounded-lg"
              style={{
                backgroundImage: `url(${shoppingCartImage})`,
                width: "630px",
                height: "455px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </section>
        </Layout>
      ) : null}
      <Layout>
        <div className="k-d-flex k-flex-col k-align-items-center k-py-12 k-px-4.5 k-px-sm-6 k-px-md-4 k-px-lg-7.5 k-px-xl-10 k-gap-10">
          <div className="k-d-flex k-flex-col k-align-items-center k-gap-4 k-text-center">
            <h2 className="k-h2 !k-mb-0">{t.whyChooseUs}</h2>
          </div>
          <div className="k-d-grid k-grid-cols-1 k-grid-cols-md-3 k-gap-5">
            <div className="k-d-flex k-flex-col k-align-items-center">
              <Avatar
                rounded="full"
                type="icon"
                themeColor="primary"
                size="large"
              >
                <SvgIcon icon={walletSolidIcon} size="xxlarge" />
              </Avatar>
              <p className="k-font-size-xl k-font-bold k-px-4 k-py-3 !k-mb-0">
                {t.returnPolicyTitle}
              </p>
              <p className="k-p-4 !k-mb-0 k-text-center">
                {t.returnPolicyContent}
              </p>
            </div>

            <div className="k-d-flex k-flex-col k-align-items-center">
              <Avatar
                rounded="full"
                type="icon"
                themeColor="primary"
                size="large"
              >
                <SvgIcon icon={heartIcon} size="xxlarge" />
              </Avatar>
              <p className="k-font-size-xl k-font-bold k-px-4 k-py-3 !k-mb-0">
                {t.includedGiftWrappingTitle}
              </p>
              <p className="k-p-4 !k-mb-0 k-text-center">
                {t.includedGiftWrappingContent}
              </p>
            </div>

            <div className="k-d-flex k-flex-col k-align-items-center">
              <Avatar
                rounded="full"
                type="icon"
                themeColor="primary"
                size="large"
              >
                <SvgIcon icon={percentIcon} size="xxlarge" />
              </Avatar>
              <p className="k-font-size-xl k-font-bold k-px-4 k-py-3 !k-mb-0 k-text-center">
                {t.discountCodeTitle}
              </p>
              <p className="k-p-4 !k-mb-0 k-text-center">
                {t.discountCodeContent}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
