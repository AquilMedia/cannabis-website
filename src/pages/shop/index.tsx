import FilterAccordion from '@/components/FilterAccordion';
import Loader from '@/components/common/Loader';
import PharmacistSelector from '@/components/PharmacistSelector';
import { useAuth } from '@/context/AuthContext';
import { useFilters } from '@/hooks/useFilters';
import LoginModal from '@/components/Modals/LoginModal';
import { AddCart, filtersData, getPharmsistList, getProductsData } from '@/services/user';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import { toast } from 'react-toastify';

const Shop: React.FC = () => {
	const { user } = useAuth();
	const [filterData, setFilterData] = useState<any[]>([]);
	const pharmacistSelectorRef = useRef<any>(null);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<any[]>([]);
	const [showLogin, setShowLogin] = useState(false);
	const [pagination, setPagination] = useState<any>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [showFilter, setShowFilter] = useState(false);

	const [filters, setFilters] = useState({
		complaints: [] as string[],
		pharmacist:[] as number[],
		manufacturers: [] as number[],
		genetics: [] as number[],
		categories: [] as number[],
		effects: [] as string[],
		thc: [1, 30] as [number, number],
		cbd: [1, 30] as [number, number],
		price: [1, 200] as [number, number]
	});
	useEffect(() => {
		getFiltersData();
		fetchProducts();
	}, [filters, currentPage]);
	useEffect(() => {
		fetchProductsonloadPage();
	}, []);
	const getFiltersData = async () => {
		try {
			const response = await filtersData();
			setFilterData(response.data || []);
		} catch (error: any) {
			toast.error(error.message || "Failed to load filters");
		}
	};
	const buildQueryParams = () => {
		const params = new URLSearchParams();
		if (filters.complaints.length)
			params.append('complaints', filters.complaints.toString());
		if (filters.effects.length)
			params.append('effects', filters.effects.join(','));
		
		if (filters.manufacturers.length) {
			filters.manufacturers.forEach(id => {
				params.append('manufacturer_id', id.toString());
			});
		}
		if (filters.pharmacist.length)
			console.log(`Pharmacist IDs: ${filters.pharmacist.join(', ')}`);

			params.append('pharmacist_id', filters.pharmacist.join(','));
		if (filters.genetics.length) {
			filters.genetics.forEach(id => params.append('genetic_id', id.toString()));
		}
		if (filters.categories.length)
			params.append('category_id', filters.categories.join(','));
		if (filters.thc)
			params.append('thc', `${filters.thc[0]}-${filters.thc[1]}`);
		if (filters.cbd)
			params.append('cbd', `${filters.cbd[0]}-${filters.cbd[1]}`);
		if (filters.price)
			params.append('price', `${filters.price[0]}-${filters.price[1]}`);
		params.append('page', currentPage.toString());
		return params.toString();
	};
	const fetchProducts = async () => {
		try {

			const query = buildQueryParams();
			console.log(`Fetching products with query: ${query}`);

			const response = await getProductsData(query);
			setProducts(response.data || []);
			setPagination(response.pagination || null);


		} catch (error: any) {
			toast.error(error.message || 'Failed to load products');
		}
	};
	const fetchProductsonloadPage = async () => {
		try {
			setLoading(true);
			const query = buildQueryParams();
			const response = await getProductsData(query);
			setProducts(response.data || []);
			setPagination(response.pagination || null);

			setLoading(false);
		} catch (error: any) {
			toast.error(error.message || 'Failed to load products');
		}
	};
	const handleFilterChange = (key: string, selectedIds: (string | number)[]) => {
		setFilters(prev => ({
			...prev,
			[key]:
				key === 'manufacturers' || key === 'effects' || key === 'pharmacist'
					? selectedIds.map(id => String(id))
					: selectedIds.map(id => Number(id)),
		}));
	};
	const totalPages = pagination?.totalPages || 1;
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			setCurrentPage(page);
		}
	};
	const handleAddToCart = (product: any) => {
		if (!user) {
			setShowLogin(true);
			return;
		}
		const quantity = 1;
		pharmacistSelectorRef.current.openSelector(product, quantity);
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div>
					<PharmacistSelector ref={pharmacistSelectorRef} />

					<div
						className="inner_sec_banner position-relative"
						style={{
							backgroundImage: `url("assets/images/listing-banner.jpg")`,
						}}
					>
						{showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
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
					<div className="secWrap pb-4 pb-lg-5">
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<div className="topFilter mb__25">
										<ul className="list-inline d-flex justify-content-between mb-0">


											<li className={`list-inline-item m-0 flex-grow-1 text-center ${filters.categories.length === 0 ? 'active' : ''}`}>
												<Link
													href="#"
													className="filter-link"
													onClick={(e) => {
														e.preventDefault();
														setFilters((prev) => ({ ...prev, categories: [] }));
														setCurrentPage(1);
													}}
												>
													<i className="cb-icon cb-filter"></i> All Products
												</Link>
											</li>

											{((filterData as any)?.categories || []).map((cat: any) => (
												<li
													key={cat.id}
													className={`list-inline-item m-0 flex-grow-1 text-center ${filters.categories.includes(cat.id) ? 'active' : ''
														}`}
												>
													<Link
														href="#"
														className="filter-link"
														onClick={(e) => {
															e.preventDefault();
															setFilters((prev) => ({
																...prev,
																categories: prev.categories.includes(cat.id) ? [] : [cat.id],
															}));
															setCurrentPage(1);
														}}
													>

														<i className="cb-icon cb-leaf"></i> {cat.title}
													</Link>
												</li>
											))}

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
							<button className="btn filterBtn mb__30 d-xl-none" onClick={() => setShowFilter(true)}> <i className="cb-icon cb-filter-btn"></i> Filters </button>
							<div className="row">
								<div className="col-lg-12 col-xl-3">
									<div className={`filterWrp ${showFilter ? "show" : ""}`}>
										<div className={`filterBx px-2`}>
											<button type="submit" className="btn filterClose d-xl-none" onClick={() => setShowFilter(false)}>X</button>
											<div className="filterSroll px-3">
												<div className="priceFilt_wrap mb__35">
													<label className="filterLbl f-w-SB clr-black mb__10">Price Range</label>

													<div className="range-slider-container">

														<RangeSlider
															className="my-slider"
															min={1}
															max={200}
															value={filters.price}
															onInput={(val) => setFilters((prev) => ({ ...prev, price: val }))}
															step={1}
														/>
														<div className="range-labels">
															<span>€{filters.price[0]}</span>
															<span>€{filters.price[1]}</span>
														</div>
													</div>
												</div>

												<div className="priceFilt_wrap mb__35">
													<label className="filterLbl f-w-SB clr-black mb__10">THC Content</label>

													<div className="range-slider-container">

														<RangeSlider
															className="my-slider"
															min={1}
															max={30}
															value={filters.thc}
															onInput={(val) => setFilters((prev) => ({ ...prev, thc: val }))}
															step={1}
														/>
														<div className="range-labels">
															<span>{filters.thc[0]}%</span>
															<span>{filters.thc[1]}%</span>
														</div>
													</div>
												</div>


												<div className="priceFilt_wrap mb__35">
													<label className="filterLbl f-w-SB clr-black mb__10"> CBD Content </label>
													<div className="">
														<RangeSlider
															className="my-slider"
															min={1}
															max={30}
															value={filters.cbd}
															onInput={(val) => setFilters((prev) => ({ ...prev, cbd: val }))}
															step={1}
														/>
													</div>
													<div className="range-labels">
														<span>{filters.cbd[0]}%</span>
														<span>{filters.cbd[1]}%</span>
													</div>
												</div>
												<div className="accordion" id="accordionExample">
													<FilterAccordion
														title="Pharmacist"
														items={(filterData as any).pharmacist || []}
														filterKey="pharmacist"
														selectedItems={filters.pharmacist}
														onChange={handleFilterChange}
													/>
													<FilterAccordion
														title="Complaints"
														items={(filterData as any).complaints || []}
														filterKey="complaints"
														selectedItems={filters.complaints}
														onChange={handleFilterChange}
													/>

													<FilterAccordion
														title="Manufacturers"
														items={(filterData as any).manufacturers || []}
														filterKey="manufacturers"
														selectedItems={filters.manufacturers}
														onChange={handleFilterChange}
													/>

													<FilterAccordion
														title="Genetics"
														items={(filterData as any).genetics || []}
														filterKey="genetics"
														selectedItems={filters.genetics}
														onChange={handleFilterChange}
													/>

													<FilterAccordion
														title="Categories"
														items={(filterData as any).categories || []}
														filterKey="categories"
														selectedItems={filters.categories}
														onChange={handleFilterChange}
													/>

													<FilterAccordion
														title="Effects"
														items={(filterData as any).effects || []}

														filterKey="effects"
														selectedItems={filters.effects}
														onChange={handleFilterChange}
													/>


												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-12 col-xl-9">
									<div className="row row-gap-4">
										{products.length === 0 ? (
											<div className="col-12 text-center">
												<p className="f-size-18 clr-black">No products found.</p>
											</div>
										) : (
											products.map((item: any) => {
												const product = item.product;
												return (
													<div className="col-sm-6 col-lg-4">
														<div className="productBx trasn_2 d-flex flex-column position-relative h-100" >
															<div className="productLbl">{product.genetic?.title || 'N/A'}</div>



															<div className="productImg mb__15">
																<Link href={{
																	pathname: `/shop/${product.slug}`,
																	query: { id: item.product_id }
																}} >
																	<img
																		src={`${product?.image}`}
																		className="w-100"
																		alt=""
																		onError={(e) => { (e.currentTarget as HTMLImageElement).src = "assets/images/dummy-product.jpg" }}
																	/>
																</Link>

															</div>
															<div className='flex-grow-1'>
																<div className="productTitle f-size-18 f-w-M clr-black">
																	{product.name}
																</div>
																<div className="productSummary mb__15">
																	{product.subtitle}
																</div>
																<div className="productCont_list mb__15">
																	<ul className="list-unstyled mb-0">
																		<li className="list-block-item">
																			<div className="d-flex justify-content-between">

																				<div className="prodLbl f-size-14"> THC/CBD: </div>
																				<div className="prodTxt clr-black f-size-14"> {product.thc}% / {product.cbd}% </div>
																			</div>
																		</li>
																		<li className="list-block-item">
																			<div className="d-flex justify-content-between">
																				<div className="prodLbl f-size-14"> Price </div>
																				<div className="prodTxt clr-green f-size-20 f-w-B"> 	€{item.price} / {item.weight_unit} </div>
																			</div>
																		</li>
																	</ul>
																</div>
															</div>
															<div className="productTag mb__10">
																<ul className="list-inline mb-0">
																	{product.effects && product.effects.length > 0 &&
																		product.effects.map((effectObj: any, index: number) => {
																			const effectName = Object.keys(effectObj)[0];
																			const effectValue = effectObj[effectName];
																			return (
																				<li
																					key={index}
																					className="list-inline-item f-size-12 clr-black mb__10"
																				>
																					{effectName}
																				</li>
																			);
																		})}
																</ul>
															</div>

															<div className="cart_sec">
																<div className="d-flex justify-content-between gap-2 align-items-center">
																	<div className="addtoCart_sec">
																		<Link href={{
																			pathname: `/shop/${product.slug}`,
																			query: { id: item.product_id }
																		}} className="addtocart_btn f-w-M"> View Details </Link>
																	</div>
																	<div className="cart-icon">

																		<button className="cartBtn clr-black" onClick={() => handleAddToCart(product)}>

																			<i className="cb-icon cb-cart"></i>

																		</button>
																	</div>
																</div>
															</div>
														</div>
													</div>

												);
											}))}


									</div>
									{pagination && totalPages > 1 && (
										<div >
											<ul className="cstPagination list-unstyled mb-0">
												<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
													<button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
														Previous
													</button>
												</li>

												{Array.from({ length: totalPages }, (_, i) => i + 1)
													.filter(page => {
														if (page === 1 || page === totalPages) return true;

														if (page >= currentPage - 1 && page <= currentPage + 1) return true;

														return false;
													})
													.map((page, index, arr) => {
														const prevPage = arr[index - 1];
														if (prevPage && page - prevPage > 1) {
															return (
																<React.Fragment key={page}>
																	<li className="page-item disabled">
																		<span className="page-link">...</span>
																	</li>
																	<li className={`page-item ${currentPage === page ? 'active' : ''}`}>
																		<button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
																	</li>
																</React.Fragment>
															);
														}
														return (
															<li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
																<button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
															</li>
														);
													})
												}

												<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
													<button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
														Next
													</button>
												</li>
											</ul>
										</div>
									)}
								</div>
							</div>
						</div>

					</div>



				</div>

			)}
		</>
	);
};

export default Shop;