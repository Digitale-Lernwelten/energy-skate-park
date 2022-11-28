/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAAAsSAAALEgHS3X78AAANkUlEQVR4nO1beXRTVRr/3ZeX5bVJmjZpWrrYpg2UtthkBKGg0ArCgFVR4SguRwXE5YwLOoN4UFAHN9wGdVDRAUVmUHEbHHAqR6QsMkXasa20BQ1daFohbdombfOSZnnzR0lom6TNSwKO5/A7p6ftXb573+9933fv9937CMdxuAB/UL/2BP5fcYGYILhATBBcICYILhATBBeICYILxATBBWKCgP61JzAcOq26wN7vfiNFJc0AANbhort67CcEAvJWXWPHR+drHuR87Hx1WnWB28M95OG4/KT42GTW4aI5AHaHs93D4eujDe2lSQmx0gS55C6lnJl53YxxMkZ89p2xDheqDSZUHPvlBIAnzgdB55SYPI1qEYBn8jNV2QVj1VDKGb82RlMPWIcTAJAQxwRsMxj/OmhwNJ+2VNU3medyHNd9LuYNnCNiCCGK3ExlaX6masoVEzOiLt9sZbFtd51FQJGnjza0/yXqA+AcEEMIUWjGxNUsujIvPU0ti6rs4dhb2YyfWjq/rjnRvija2hNVYuYVZme0mKwHFpcUpA/2EecSZiuLraW1HbSAPBBN3xM1Ys6YT8XSq3XZgUipNpjQaWFxLkwLALbvqXeYrfb1P54wPRYNeVEjRqdVl5ZM0/4+kPmU17aBtTvPGSmDxzEYuzYd+tF4V6SyorLBy9OoFo1LTwhISrXBdF5IAYDC/BRo0+KXjk1PWBOprKgQ43JzbwR6cLOVRY3BdF5I8aIwPwWpKumqyXkpV0UiJ2JiLs5Wv1AyNUsVqG5vZTMWXjE+ZFmswxXpdAAAN87KFXf3OrYQQhThyoiYGIfTvXRseoJfudnKghELEerqZDT14N9Hfol0Oj4sLM5R5WYq3w+3f0TEjKYtM3mYUJpahj2H66OmNWlqGZRyZqZOqy4Ip39ExFAUuTOQtnjBdy8ze+oEHD1pi2RKQzBnikZm6ev/Wzh9wyZGk6K4W6dVJwWqqzaYMBJhwZCslMPU3R/ulPyglDNIV8vGh+NrwiZGIZUsL8xPCVhnNPVAp1XzlunyCKDPy4HZyoY7LT/MmaKR5WtUr/DtFxYxhJDMuFhRVrB6b7TMF/GKOEwYp4GFFYTVPxCUcgYOp5v30h0WMfka1epZl2aKw+kbDM0mFgXjtSjU56K1vTeaojF1QmqyZoxiOp8+4ZrS7JHyJoxYyFtgfbMFhfpcAIDDFd2IX6dVg6LIaj59eIfAhJDM64vGJQar/7mlE6zDiV2HTgAAhEIRKGEMpIy/gvWyDkgZMdweN6ysG3JpDADA6SYoP35Wa5zOfjhdA045MV6KRIUUNlsP4mLpURNbwMDqmCCXZPN6Tr5B5ISsxE03XZm7JNiEWIcLRpPVtyrVGe2YN2sO8rTRCQvqDM2w9g4s6XUnmtHZZUFXtwX9/Q4IBR5cpGaQofaf25ncja7aYKoJZRzeGiOgyCUjmxE9ZKk+ZbZHjRQAQ2R5Tc8La68NG7d9gQ2fHUFSQiwK81PhDWwLxqpR32x+CMDSUMbhTYw0RpTGp72EiQlY/mnpAQDAwrm8fOKQ/ta+PixZMNdXJpfGgJGIsWh2HmLEQmwtPQoOOF0yNTspTS2DgCKXhCqfl/PVjFFMz06NDxgCBILR1ANd7ji/8hXr3kFasgppySofQXxgPNWBtGQV8rIz8NqWz4fUNZ5sgVLOgBHT6He5D9cYTOP/eeCnHdv31DuEtEAb6hi8NIamqZvGpseH3L6LJbhMe5Ff+Usr7+YzrB+8pAL+5iQWDrxro6kHAooqO5MLvm5yXspVhtauL/I0qkWhpEB5aYyQpiaFsgp4YbW5R/QvH+8q8zlSvjjW0IJjDS1+5eauroHfVhZHG9pLveXf17V9FS+VXGnpdYTkCnhpjEIqkfBpP1Kk/ODaDdi5txxbd3yDne88w0csAODWPz4HR78Thz5+3bfM1xwzIDlh4MUZTT3gOK5scJ/GX7oPAAjJdnlpjMfDhexfACAxQRm0zvu2T7V38hHpQ5elFzbWgTpDs6+s7D8V8Jq6y+2xhCX4DHgRI2WEvDSspy94MCikB+Khfmdk+RevtgBAY0urb8PX73RHdM7EixixiA6YZggGWWxwf5SWPLB5VirkfET6kJt9EbQZKVHdIw3Gr3bb4aWVd+OVzZ/g7ptKwuq/691n/coU8uidfP5qxMilMXj6wTuiKlMsPquhEhGdHIms38TFod0HK4c42VBAUSSitAgvYmx2J6/ZjeR8+WDO5RPx2pbPUV5VH3IfZRwDQkhxuGPyIoZ1uHiZXgwj4jebEWDttQ1ZgQKh3dzh+1splyA3Uxm2OfEixmpzGPm07+yOzs2M8qp6GE91jLoCecMBYCBZJqAofbhj8iKGIqSWT6JaSHnC3vIPx8a1y0dt4w0HgIFzJbfHE/ox6DDwIqaPdb7/c0vX6A3PIDNZyssvBEOhPndUbdn57XfQjPFbrs+PKTX+0n2gvqmjIdT2GWoG31UGT5ht+Hg3HnhxC3bsr4bxVEfQdqFgz8FyvyObWIkwaAp2NPDex/TZnT+arWxWqFG23R7clP5w0xw88OIW6ItKUFlVhe3798PtdIDzuBEropA/LhtyWSwAoKXtNI41GtF8sgVvrr53iJwmYxvczj4/+RIRHTYxvHO+hJDMuVOyjl1zuTakfcJoOd9euxPrPvgKf1r5OPT6ob6yrKzM97dCocAXn3+O/CQRLs3LHNLuluVPYuGMTL8j4fLaNhyoaplxJqrmBd4bPI7jmppPW6pCPXzXJNL4eNe3QeulEiFW3DIbb69fhyfXrEFTU5Ovrri4GMXFxdDr9Xhv82YoSI8fKSvXbUDh+ISA5+Rj0+MRywjvDGmiwxBuSLC+2mD6MNgR7WAwYho/1P6IHd8cwvwrpwVsI5fGYOUdJWjrsGDrW6+grb0L8QlKULQInR0mSCVC3Fj0O6So4ob0W/vGJkhIL8amB56HUs7wyvMORth38PI0KsP9CyaGdFZjtrLY+vUxzC2ahocXLwxrvOFY8dzriKFZjPZy/rG7tuO7GiNvXxNJrPREeW1bSA2VcgZpKgYeezvuePQFtJ4OfwWy9tpwzbKVGDeGHpUUAJiQlajSpCh4J5nDJqauseOjg9Ut/knXICiZpkVlXROm5qnx+KvvhXU6UHPMgLseewaL541HqJerdVo1hLRg9N3hMEQUXccyom0/t4ycmjRbWZTXtmHXIQMYMY3WdiseXXYj5NIYrFj3TsgbwHe3f2V/av0mpCZIYLaEvvs2W1n02vqzCSGZIXdCFO756sYmnbpnvj4JGEh+/9TS6ftwwuX2gCIE0hgxnC63pdPKmo3tNuWhTzb4vOjmz0pRbziJKbpczLl84pBA0dprw+6Dlfhw57ct0hjm0f1Haj4ihOgnZCUuogj0AJIS5Ew863DRjJj2LZPe/0939Z2iCKmtbexYy3Fc03klJi1RXkUo6ACAEdFgJMLTTpe7iRHR9g4L25SVoqgq++FkGcdxVeOzBEZVfHzq1pfX+8kpr6rH4ep6XxRt7bWhqq4O0ljFzfuP1Jy375S8iDiDZ2y3hhTBzpkmXPToYlHq97WBTw4K9bl+h2f3P/UYPJ762QB+e8QMByFEf2uJcJJCTqSDy5UKcq1YREKWY+21oWCcGEKaWvLQbaIlcTKCplauFQBaTnlOHG/y1LWZPPdFefo+RO1bglXLxBm7D7m/vXEunaWQEWSnD/Xr1cfdyE6nwEji8F31DNy54JoR5e0+WImE2G3ISutD9XE3br926GWkojttcPSjobLOPfFcfNAVlZzvqmXijONNnv+WbmSyHrldhKMGD7p7OBRNEvh+dDkCuNzAzMl9SE08iNe3bB9R5p5De3H9LBa6HApVxz1+9Qtm03j3aXHW7Kl0RSQ3wIMhYmIIIYqKWs+ejU9KEhSyAVN5dYUY+yrcqB70QLocCvsq3ACAJdf1YN5lR3DfmmcCLteflh7ADbPO3qiyWP21ev4VNPZ+78a2FyXZ8y6na1YtE0f1gCliYuZMo0ufXy7O9pLixasrxHj972fv7CpkBBYrh+6egYecObkPO//aBqtlG1a++DI2f1aK8qp6rFj3JjzOb7BwtgkAsK/CjaJL/W9xZqRQaGrjoJARfPC8JL3W4DkcTc2JyMfMmy7cdNcC4ZL5VwT24Tv2umDp4Xz+ofq4B1u+dOLVFf4Zi8ZWERpapZiYa8ZgkpeutmPT2sB3CR55yYE194qgkBF093AoXmw7ffRnd0TnSV6ErTHTJ9Jrrp9J3xyMFGBA3auGmZM+h8LS1Xa/tprUfsya3DmElD+/7cDt84PfAC2aJPCZq0JGsOVZJmmant4dzvMMR1jEXDVd+PD0SwSrltwgDP2yzBncfq0QD94mwoLlrM/nBMIjLzmQmUKhaFLwy9D6HArVx8/K0OVQKL5UMOO2q0URf+HG25QmX0xP14+ndr35hCSkKO7Pbzvw4K0iDPdBAPDBl07sO+JGRiqBLmeAAC9Zd1wrhC5n9PfW3OZBRsrQdnPvsVn2HHZnRrKM8yKGEKKYNUXQVLoxJm701gPwPuhIb55Pu0D9hvfp7uEw9x62oaLWxetu72DwMqUpBYKaj15mQiaFD7z7Hb7YV+HyrXReKGQE6x4RZ0Xib/4HnP/7x95dnQYAAAAASUVORK5CYII=';
export default image;