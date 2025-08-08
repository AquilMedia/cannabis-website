import Link from 'next/link';
import React from 'react';
import RangeSlider from 'react-range-slider-input';

const Shop: React.FC = () => {
	return (
		<div>
			<div
				className="inner_sec_banner position-relative"
				style={{
					backgroundImage: `url("/assets/images/listing-banner.jpg")`,
				}}
			>

				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="innerBanner_cont text-center position-relative">
								<div className="filterIcon text-white mb__25 f-size-60 line_H_1"> <i className="cb-icon cb-filter"></i> </div>
								<div className="bannerHeading f-size-60 text-white f-w-B line_H_1"> All Products </div>
								<div className="txtSummary f-size-18 text-white"> Premium medical cannabis products available with prescription in Germany </div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="secWrap pb-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="topFilter mb__25">
								<ul className="list-inline d-flex justify-content-between mb-0">
									<li className="list-inline-item"> <Link href="" className="filter-link"> <i className="cb-icon cb-filter"></i> All Products </Link> </li>
									<li className="list-inline-item active"> <Link href="" className="filter-link"> <i className="cb-icon cb-leaf"></i> Cannabis Flowerss </Link> </li>
									<li className="list-inline-item"> <Link href="" className="filter-link"> <i className="cb-icon cb-oil"></i> Oil </Link> </li>
									<li className="list-inline-item"> <Link href="" className="filter-link"> <i className="cb-icon cb-capsule"></i> Capsule </Link> </li>
									<li className="list-inline-item"> <Link href="" className="filter-link"> <i className="cb-icon cb-drop"></i> Drops </Link> </li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="legelNotice_txt">
								<strong className="clr-green">Legal Notice:</strong> Maximum order limit of 100g or 100ml per order as per German law. Prescription required for all products.
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="secWrap pt-0">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<div className="filterBtn mb__30">
								<i className="cb-icon cb-filter-btn"></i> Filters
							</div>


							<div className="filterBx">
								<div className="priceFilt_wrap mb__35">
									<label className="filterLbl f-w-SB clr-black mb__10"> Price Range (€) </label>
									<div className="">
										<RangeSlider
											className="my-slider"
											min={0}
											max={100}
											defaultValue={[0, 200]}
											step={1}
										/>
									</div>
								</div>

								<div className="priceFilt_wrap mb__35">
									<label className="filterLbl f-w-SB clr-black mb__10"> THC Content (%) </label>
									<div className="">
										<RangeSlider
											className="my-slider"
											min={0}
											max={100}
											defaultValue={[20, 80]}
											step={1}
										/>
									</div>
								</div>

								<div className="priceFilt_wrap mb__35">
									<label className="filterLbl f-w-SB clr-black mb__10"> CBD Content (%) </label>
									<div className="">
										<RangeSlider
											className="my-slider"
											min={0}
											max={100}
											defaultValue={[20, 80]}
											step={1}
										/>
									</div>
								</div>

								<div className="accordion" id="accordionExample">
									<div className="accordion-item">
										<button className="accordion-button f-w-SB clr-black" type="button" data-bs-toggle="collapse" data-bs-target="#filter-one" aria-expanded="true" aria-controls="filter-one">
											Complaints
										</button>
										<div id="filter-one" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
											<div className="accordion-body">
												<ul className="list-unstyled">
													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Depression</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Stress</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Inflammations</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Pain</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Anxiety</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Gastrointestinal problems</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Sleep disorders</span>
														</label>
													</li>

												</ul>
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button f-w-M clr-black" type="button" data-bs-toggle="collapse" data-bs-target="#filter-two" aria-expanded="false" aria-controls="filter-two">
												Manufacturer
											</button>
										</h2>
										<div id="filter-two" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">

											<div className="accordion-body">
												<ul className="list-unstyled">
													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">ACA Müller Pharma</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">ADREXpharma</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Adven</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">AlephSana</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">AMP</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Aphria</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Aurora Cannabis</span>
														</label>
													</li>

												</ul>
											</div>

										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button f-w-M clr-black" type="button" data-bs-toggle="collapse" data-bs-target="#filter-three" aria-expanded="false" aria-controls="filter-three">
												Genetics
											</button>
										</h2>
										<div id="filter-three" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">

											<div className="accordion-body">
												<ul className="list-unstyled">
													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Indica</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Sativa</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Hybrid</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Hybrid - Sativa dominant</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Hybrid - Indica dominant</span>
														</label>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button f-w-M clr-black" type="button" data-bs-toggle="collapse" data-bs-target="#filter-four" aria-expanded="false" aria-controls="filter-four">
												Category
											</button>
										</h2>
										<div id="filter-four" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">

											<div className="accordion-body">
												<ul className="list-unstyled">
													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Flowers</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Extracts</span>
														</label>
													</li>

												</ul>
											</div>
										</div>
									</div>

									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button f-w-M clr-black" type="button" data-bs-toggle="collapse" data-bs-target="#filter-five" aria-expanded="false" aria-controls="filter-five">
												Effects
											</button>
										</h2>
										<div id="filter-five" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">

											<div className="accordion-body">
												<ul className="list-unstyled">
													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Mood-enhancing</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Stress relieving</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Anti-inflammatory</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Antibacterial</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Antioxidant</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Relaxing</span>
														</label>
													</li>

													<li className="flr-checkItem mb__15">
														<label className="ctm-checkbox">
															<input type="checkbox" />
															<span className="checkbox"></span>
															<span className="checkboxTxt clr-black f-size-14">Pain-relieving</span>
														</label>
													</li>

												</ul>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="d-lg-flex justify-content-between mb__25">
								<div className="productTop_name f-size-28 f-w-SB clr-black">
									Inflammations
								</div>
								<div className="showingResult_sec">
									<ul className="list-inline mb-0">
										<li className="list-inline-item">
											<div className="filterby_name ">
												<select className="select-filter primary-clr">
													<option> Name A-Z </option>
													<option> Price: Low to High </option>
													<option> Price: High to Low </option>
													<option> THC: High to Low </option>
													<option> CBD: High to Low </option>
												</select>
											</div>
										</li>
										<li className="list-inline-item">
											<div className="showResult f-size-18 clr-black">
												Showing 18 products
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-4">
									<div className="productBx mb__30 trasn_2 position-relative" data-eq="proHq">
										<div className="productLbl"> indica </div>

										<div className="productImg mb__15">
											<img   src="/assets/images/product-img-1.png"className="w-100" alt="" />
										</div>
										<div className="productTitle f-size-18 f-w-M clr-black">
											Sourdough
										</div>
										<div className="productSummary mb__15">
											Pedanios 29/1 SRD-CA
										</div>
										<div className="productCont_list mb__15">
											<ul className="list-unstyled mb-0">
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> THC/CBD: </div>
														<div className="prodTxt clr-black f-size-14"> 29% / 1% </div>
													</div>
												</li>
												<li className="list-block-item">
													<div className="d-flex justify-content-between">
														<div className="prodLbl f-size-14"> Price </div>
														<div className="prodTxt clr-green f-size-20 f-w-B"> €7.21 / g </div>
													</div>
												</li>
											</ul>
										</div>
										<div className="productTag mb__10">
											<ul className="list-inline mb-0">
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Inflammations
												</li>
												<li className="list-inline-item f-size-12 clr-black mb__10">
													Limonen
												</li>
											</ul>
										</div>
										<div className="cart_sec">
											<div className="d-flex justify-content-between gap-2 align-items-center">
												<div className="addtoCart_sec">
													<Link href="/productdetails" className="addtocart_btn f-w-M"> View Details </Link>
												</div>
												<div className="cart-icon">
													<Link href="" className="cartBtn clr-black"> <i className="cb-icon cb-cart"></i> </Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;