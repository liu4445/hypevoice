package hypevoice.hypevoiceback.categoryInfo.dto;

import lombok.Builder;

@Builder
public record CategoryInfoValue(
    Long workId,
    String mediaClassificationValue,
    String voiceStyleValue,
    String voiceToneValue,
    String genderValue,
    String ageValue
){

}
