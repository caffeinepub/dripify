import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type GarmentType = {
    #tShirt;
    #longSleeveShirt;
    #hoodie;
    #zipUpHoodie;
    #crewNeck;
    #poloShirt;
    #tankTop;
    #vNeckShirt;
    #sweatpants;
    #shorts;
    #beanie;
    #cap;
    #joggers;
    #leggings;
    #dress;
    #skirt;
    #sportsJersey;
    #pufferJacket;
    #backpack;
    #duffleBag;
    #fannyPack;
    #toteBag;
    #canvasPoster;
  };

  public type Color = {
    red : Nat8;
    green : Nat8;
    blue : Nat8;
  };

  public type TextLayer = {
    text : Text;
    position : {
      x : Float;
      y : Float;
    };
    fontSize : Nat;
    color : Color;
    rotation : Float;
    fontFamily : Text;
    isBold : Bool;
    isItalic : Bool;
    isUnderline : Bool;
    textSpacing : Nat;
    shadow : {
      offsetX : Float;
      offsetY : Float;
      blurRadius : Float;
      color : Color;
    };
  };

  public type Design = {
    id : Text;
    owner : Principal;
    name : Text;
    garmentType : GarmentType;
    textLayers : [TextLayer];
    createdAt : Int;
    updatedAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  let designs = Map.empty<Text, Design>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func saveDesign(id : Text, name : Text, garmentType : GarmentType, textLayers : [TextLayer]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save designs");
    };

    let now = Time.now();

    let design : Design = {
      id;
      owner = caller;
      name;
      garmentType;
      textLayers;
      createdAt = now;
      updatedAt = now;
    };

    designs.add(id, design);
  };

  public query ({ caller }) func getDesign(id : Text) : async Design {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access designs");
    };

    switch (designs.get(id)) {
      case (?design) {
        if (design.owner != caller) {
          Runtime.trap("Unauthorized: You do not own this design");
        };
        design;
      };
      case (null) { Runtime.trap("Design not found") };
    };
  };

  public shared ({ caller }) func deleteDesign(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete designs");
    };

    switch (designs.get(id)) {
      case (?design) {
        if (design.owner != caller) {
          Runtime.trap("Unauthorized: You do not own this design");
        };
      };
      case (null) { Runtime.trap("Design not found") };
    };
    designs.remove(id);
  };

  public query ({ caller }) func listMyDesigns() : async [Design] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list designs");
    };

    let filtered = designs.values().toArray().filter(func(design) { design.owner == caller });

    filtered;
  };

  public shared ({ caller }) func renameDesign(id : Text, newName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can rename designs");
    };

    switch (designs.get(id)) {
      case (?design) {
        if (design.owner != caller) {
          Runtime.trap("Unauthorized: You do not own this design");
        };
        let updatedDesign : Design = {
          id = design.id;
          owner = design.owner;
          name = newName;
          garmentType = design.garmentType;
          textLayers = design.textLayers;
          createdAt = design.createdAt;
          updatedAt = Time.now();
        };
        designs.add(id, updatedDesign);
      };
      case (null) { Runtime.trap("Design not found") };
    };
  };
};
